<?php

namespace App\Console\Commands;

use App\Models\Slika;
use App\Models\TradicionalnaManifestacija;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UveziTradicionalneManifestacije extends Command
{
    protected $signature = 'manifestacije:uvezi-tradicionalne
                            {--izvor= : Putanja do korijena frontend projekta (folder koji sadrži src/data i src/assets). Podrazumijevano: dva nivoa iznad backenda.}';

    protected $description = 'Jednokratni uvoz tradicionalnih manifestacija (tekstovi + slike) iz frontend JSON-a i lokalnih slika u bazu i storage.';

    /**
     * Ključ slike iz JSON-a (slikeKeys) → naziv fajla u src/assets/manifestacije
     */
    private const SLIKE = [
        'b1' => 'bazar1.jpg',
        'b2' => 'bazar2.jpg',
        'b3' => 'bazar3.jpg',
        'b4' => 'bazar4.jpg',
        'b5' => 'bazar5.jpg',
        'b6' => 'bazar6.jpg',
        'cd1' => 'cd1.jpg',
        'cd2' => 'cd2.jpg',
        'cd3' => 'cd3.jpg',
        'cd4' => 'cd4.jpg',
        'cd5' => 'cd5.jpg',
        'cd6' => 'cd6.jpg',
        'dj2' => 'djeram2.jpg',
        'dj3' => 'djeram3.jpg',
        'dj4' => 'djeram4.jpg',
        'dj5' => 'djeram5.jpg',
        'dj6' => 'djeram6.jpg',
        'g1' => 'gulasijada1.jpg',
        'g2' => 'gulasijada2.jpg',
        'g3' => 'gulasijada3.jpg',
        'g4' => 'gulasijada4.jpg',
        'g5' => 'gulasijada5.jpg',
        'g6' => 'gulasijada6.jpg',
        'lile1' => 'lile1.jpg',
        'lile2' => 'lile2.jpg',
        'lile3' => 'lile3.jpg',
        'lile4' => 'lile4.jpg',
        'lile5' => 'lile5.jpg',
        'lile6' => 'lile6.jpg',
        'mtb1' => 'mtb1.jpg',
        'mtb2' => 'mtb2.jpg',
        'mtb3' => 'mtb3.jpg',
        'mtb4' => 'mtb4.jpg',
        'mtb5' => 'mtb5.jpg',
        'op1' => 'op1.jpg',
        'op2' => 'op2.jpg',
        'op3' => 'op3.jpg',
        'slet1' => 'slet1.jpg',
        'slet2' => 'slet2.jpg',
        'slet3' => 'slet3.jpg',
        'slet4' => 'slet4.jpg',
        'vid1' => 'vid1.jpg',
        'vid2' => 'vid2.jpg',
        'vid3' => 'vid3.jpg',
        'vid4' => 'vid4.jpg',
        'vid5' => 'vid5.jpg',
        'vid6' => 'vid6.jpg',
        'vk1' => 'vk1.jpg',
        'vk2' => 'vk2.jpg',
        'vk3' => 'vk3.jpg',
        'vk4' => 'vk4.jpg',
    ];

    public function handle(): int
    {
        $izvor = rtrim($this->option('izvor') ?: base_path('../..'), '/\\');

        $jsonPutanja = $izvor . '/src/data/manifestacijeData.json';
        $slikePutanja = $izvor . '/src/assets/manifestacije';

        if (!is_file($jsonPutanja)) {
            $this->error("Nije pronađen fajl: {$jsonPutanja}");
            $this->line('Zadaj putanju do frontend projekta: php artisan manifestacije:uvezi-tradicionalne --izvor=/putanja/do/projekta');
            return self::FAILURE;
        }

        $podaci = json_decode(file_get_contents($jsonPutanja), true);
        $lista  = $podaci['tradicionalneManifestacije'] ?? [];

        if (empty($lista)) {
            $this->warn('U JSON-u nema tradicionalnih manifestacija.');
            return self::SUCCESS;
        }

        $uvezeno = 0;
        $preskoceno = 0;
        $slikaUkupno = 0;

        foreach ($lista as $index => $m) {
            if (TradicionalnaManifestacija::where('naslov', $m['naslov'])->exists()) {
                $this->line("Preskačem (već postoji): {$m['naslov']}");
                $preskoceno++;
                continue;
            }

            DB::transaction(function () use ($m, $index, $slikePutanja, &$slikaUkupno) {
                $manifestacija = TradicionalnaManifestacija::create([
                    'naslov'     => $m['naslov'],
                    'opis'       => $m['opis'] ?? null,
                    'period'     => $m['period'] ?? null,
                    'redoslijed' => $index + 1,
                    'aktivan'    => true,
                ]);

                // Engleski prevodi već postoje u JSON-u — ne trošimo prevodilac
                $manifestacija->naslov_en = $m['naslov_en'] ?? null;
                $manifestacija->opis_en   = $m['opis_en'] ?? null;
                $manifestacija->period_en = $m['period_en'] ?? null;
                $manifestacija->save();

                foreach (($m['slikeKeys'] ?? []) as $i => $kljuc) {
                    $fajl = self::SLIKE[$kljuc] ?? null;
                    $puna = $fajl ? $slikePutanja . '/' . $fajl : null;

                    if (!$puna || !is_file($puna)) {
                        $this->warn("  Slika nije pronađena ({$kljuc}) — preskačem.");
                        continue;
                    }

                    $ekstenzija = strtolower(pathinfo($puna, PATHINFO_EXTENSION)) ?: 'jpg';
                    $relativna  = 'slike/' . Str::uuid() . '.' . $ekstenzija;
                    Storage::disk('public')->put($relativna, file_get_contents($puna));

                    $slika = Slika::create([
                        'url'     => Storage::url($relativna),
                        'aktivan' => true,
                    ]);

                    DB::table('tradicionalne_slike')->insert([
                        'tradicionalna_id' => $manifestacija->id,
                        'slika_id'         => $slika->id,
                        'glavna'           => $i === 0 ? 1 : 0,
                        'aktivan'          => 1,
                        'created_at'       => now(),
                        'updated_at'       => now(),
                    ]);

                    $slikaUkupno++;
                }
            });

            $this->info("Uvezeno: {$m['naslov']}");
            $uvezeno++;
        }

        $this->newLine();
        $this->info("Gotovo. Manifestacija uvezeno: {$uvezeno}, preskočeno: {$preskoceno}, slika: {$slikaUkupno}.");

        return self::SUCCESS;
    }
}
