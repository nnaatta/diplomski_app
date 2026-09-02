<?php

namespace App\Http\Controllers;

use App\Models\Slika;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SlikaController extends Controller
{
    /**
     * Sve pivot tabele u kojima slika_id može biti referenciran.
     */
    private const PIVOT_TABELE = ['smjestaj_slike', 'restoran_slike', 'blog_slike', 'galerija_slike'];

    /**
     * Upload jedne ili više slika i poveži ih s entitetom.
     *
     * smjestaj  → pivot smjestaj_slike  (smjestaj_id, slika_id, glavna, aktivan)
     * restoran  → pivot restoran_slike  (restoran_id, slika_id, glavna, aktivan)
     * blog      → pivot blog_slike      (blog_id,     slika_id, glavna, aktivan)
     * galerija  → pivot galerija_slike  (galerija_id, slika_id, glavna, aktivan)
     * dogadjaj            → FK dogadjaji.slika_id
     * turisticki_sadrzaj  → FK turisticki_sadrzaji.slika_id
     *
     * glavna_index: index fajla koji treba biti glavna.
     *   -1  = ne postavljaj nijednu kao glavnu (već postoji glavna među starim)
     *    0+ = postavi sliku na tom indeksu kao glavnu (default: 0)
     */
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slike'        => 'required|array|min:1',
            'slike.*'      => 'required|image|mimes:jpg,jpeg,png,webp,gif|max:5120',
            'entitet_tip'  => 'required|in:smjestaj,restoran,blog,galerija,dogadjaj,turisticki_sadrzaj',
            'entitet_id'   => 'required|integer|min:1',
            'glavna_index' => 'nullable|integer|min:-1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Neuspješna validacija.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $tip      = $request->entitet_tip;
        $entId    = (int) $request->entitet_id;
        // -1 znači "ne postavljaj nijednu kao glavnu"
        $glavnaIdx = $request->has('glavna_index') ? (int) $request->glavna_index : 0;

        $fajlovi = $request->file('slike');
        if (in_array($tip, ['dogadjaj', 'turisticki_sadrzaj'])) {
            $fajlovi = [$fajlovi[0]];
        }

        $uploadovane = [];
        foreach ($fajlovi as $index => $fajl) {
            $putanja = $fajl->store('slike', 'public');

            $slika = Slika::create([
                'url'     => Storage::url($putanja),
                'aktivan' => true,
            ]);

            $jeGlavna = ($glavnaIdx >= 0) && ($index === $glavnaIdx);
            $this->sacuvajVezu($slika, $tip, $entId, $index, $glavnaIdx);

            $uploadovane[] = [
                'id'     => $slika->id,
                'url'    => $slika->url,
                'glavna' => $jeGlavna,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Slike uspješno uploadovane.',
            'slike'   => $uploadovane,
        ], 201);
    }

    /**
     * Postavi sliku kao glavnu (pivot entiteti).
     */
    public function postaviGlavnu(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'entitet_tip' => 'required|in:smjestaj,restoran,blog,galerija',
            'entitet_id'  => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $tabela = $this->pivotTabela($request->entitet_tip);
        $kolona = "{$request->entitet_tip}_id";
        $entId  = (int) $request->entitet_id;

        DB::table($tabela)->where($kolona, $entId)->update(['glavna' => 0]);
        DB::table($tabela)->where($kolona, $entId)->where('slika_id', $id)->update(['glavna' => 1]);

        return response()->json(['success' => true]);
    }

    /**
     * Brisanje slike:
     * - Pivot entiteti (smjestaj, restoran, blog, galerija): briše se VEZA (pivot red).
     *   Ako je bila glavna — sljedeća preostala postaje glavna.
     * - FK entiteti (dogadjaj, turisticki_sadrzaj): postavi slika_id=NULL na entitetu.
     *
     * U OBA slučaja: nakon brisanja veze, provjeravamo da li slika_id postoji
     * bilo gdje drugo u sistemu. Ako ne postoji nigdje — fizički fajl na disku
     * i red u `slike` tabeli se TRAJNO brišu, da se prostor na disku i baza
     * ne pune zauvijek neiskorišćenim slikama.
     */
    public function destroy(Request $request, int $id)
    {
        $slika = Slika::find($id);
        if (!$slika) {
            return response()->json(['success' => false, 'message' => 'Slika nije pronađena.'], 404);
        }

        $tip   = $request->query('entitet_tip');
        $entId = (int) $request->query('entitet_id', 0);

        if ($tip === 'dogadjaj' && $entId) {
            DB::table('dogadjaji')
                ->where('id', $entId)
                ->where('slika_id', $id)
                ->update(['slika_id' => null]);

        } elseif ($tip === 'turisticki_sadrzaj' && $entId) {
            DB::table('turisticki_sadrzaji')
                ->where('id', $entId)
                ->where('slika_id', $id)
                ->update(['slika_id' => null]);

        } elseif (in_array($tip, ['smjestaj', 'restoran', 'blog', 'galerija'])) {
            $tabela = $this->pivotTabela($tip);
            $kolona = "{$tip}_id";

            // Provjeri da li je bila glavna
            $bilGlavna = (bool) DB::table($tabela)
                ->where($kolona, $entId)
                ->where('slika_id', $id)
                ->value('glavna');

            // Stvarno brišemo vezu (ne samo aktivan=0)
            DB::table($tabela)
                ->where($kolona, $entId)
                ->where('slika_id', $id)
                ->delete();

            // Ako je bila glavna — promoviši sljedeću preostalu
            if ($bilGlavna) {
                $sljedeca = DB::table($tabela)
                    ->where($kolona, $entId)
                    ->where('aktivan', 1)
                    ->orderBy('id')
                    ->first();

                if ($sljedeca) {
                    DB::table($tabela)
                        ->where('id', $sljedeca->id)
                        ->update(['glavna' => 1]);
                }
            }
        }

        $this->obrisiSlikuAkoOsirotjela($id);

        return response()->json(['success' => true]);
    }

    // ─── Privatne helper metode ──────────────────────────────────────────────

    private function sacuvajVezu(Slika $slika, string $tip, int $entId, int $index, int $glavnaIdx = 0): void
    {
        // -1 znači ne postavljaj nijednu kao glavnu
        $jeGlavna = ($glavnaIdx >= 0 && $index === $glavnaIdx) ? 1 : 0;

        match ($tip) {
            'smjestaj' => DB::table('smjestaj_slike')->insert([
                'smjestaj_id' => $entId,
                'slika_id'    => $slika->id,
                'glavna'      => $jeGlavna,
                'aktivan'     => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]),
            'restoran' => DB::table('restoran_slike')->insert([
                'restoran_id' => $entId,
                'slika_id'    => $slika->id,
                'glavna'      => $jeGlavna,
                'aktivan'     => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]),
            'blog' => DB::table('blog_slike')->insert([
                'blog_id'    => $entId,
                'slika_id'   => $slika->id,
                'glavna'     => $jeGlavna,
                'aktivan'    => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]),
            'galerija' => DB::table('galerija_slike')->insert([
                'galerija_id' => $entId,
                'slika_id'    => $slika->id,
                'glavna'      => $jeGlavna,
                'aktivan'     => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]),
            'dogadjaj' => DB::table('dogadjaji')
                ->where('id', $entId)
                ->update(['slika_id' => $slika->id]),
            'turisticki_sadrzaj' => DB::table('turisticki_sadrzaji')
                ->where('id', $entId)
                ->update(['slika_id' => $slika->id]),
        };
    }

    private function pivotTabela(string $tip): string
    {
        return match ($tip) {
            'smjestaj' => 'smjestaj_slike',
            'restoran' => 'restoran_slike',
            'blog'     => 'blog_slike',
            'galerija' => 'galerija_slike',
            default    => throw new \InvalidArgumentException("Nepoznat pivot tip: {$tip}"),
        };
    }

    /**
     * Provjerava da li je slika i dalje referencirana bilo gdje u sistemu
     * (bilo koja pivot tabela ili FK kolona). Ako nije — briše fizički fajl
     * sa diska i red iz `slike` tabele. Koristi i CleanupOsiroteleSlike komanda.
     */
    public static function obrisiSlikuAkoOsirotjela(int $slikaId): void
    {
        foreach (self::PIVOT_TABELE as $tabela) {
            if (DB::table($tabela)->where('slika_id', $slikaId)->exists()) {
                return; // još uvijek se koristi negdje — ne diramo je
            }
        }

        if (DB::table('dogadjaji')->where('slika_id', $slikaId)->exists()) {
            return;
        }

        if (DB::table('turisticki_sadrzaji')->where('slika_id', $slikaId)->exists()) {
            return;
        }

        $slika = Slika::find($slikaId);
        if (!$slika) {
            return;
        }

        // url je oblika ".../storage/slike/ime-fajla.jpg" — skidamo dio prije "storage/"
        // da dobijemo putanju relativnu za 'public' disk (npr. "slike/ime-fajla.jpg")
        $relativnaPutanja = Str::after($slika->url, '/storage/');
        if ($relativnaPutanja && Storage::disk('public')->exists($relativnaPutanja)) {
            Storage::disk('public')->delete($relativnaPutanja);
        }

        $slika->delete();
    }
}