<?php

namespace App\Http\Controllers;

use App\Http\Resources\PorukaResource;
use App\Mail\NovaPorukaMail;
use App\Models\Poruka;
use App\Models\Tip_poruke;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PorukaController extends Controller
{
    /**
     * Tipovi upita sa kontakt forme (srpski nazivi).
     * Pri prvoj poruci određenog tipa automatski se pravi i u tabeli tipovi_poruke.
     */
    private const TIPOVI_UPITA = [
        'Opšti upit',
        'Smještaj',
        'Manifestacije',
        'Planinarski turizam',
        'Zdravstveni turizam',
        'Mediji i press',
        'Ostalo',
    ];

    public function index(Request $request)
    {
        $query = Poruka::with(['tip_poruke']);

        // filter po statusu
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // filter po tipu poruke
        if ($request->has('tip_poruke_id')) {
            $query->where('tip_poruke_id', $request->tip_poruke_id);
        }

        // najnovije poruke prvo
        $query->orderBy('created_at', 'desc');

        return PorukaResource::collection($query->paginate(10));
    }

    // ovu metodu poziva javni dio sajta (kontakt forma)
    // nije zaštićena auth middleware-om
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime'          => 'required|string|max:100',
            'prezime'      => 'nullable|string|max:100',
            'email'        => 'required|email|max:250',
            'br_tel'       => 'nullable|string|max:30',
            'naslov'       => 'required|string|max:250',
            'tekst'        => 'required|string',
            'tip_poruke_id' => 'nullable|exists:tipovi_poruke,id',
            'tip_upita'    => ['nullable', 'string', Rule::in(self::TIPOVI_UPITA)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // forma ima jedno polje za ime i prezime — prezime može biti prazno
        $data['prezime'] = $data['prezime'] ?? '';

        // tip upita (tekst sa forme) -> tip_poruke_id
        $tipUpita = $data['tip_upita'] ?? null;
        unset($data['tip_upita']);
        if ($tipUpita && empty($data['tip_poruke_id'])) {
            $data['tip_poruke_id'] = Tip_poruke::firstOrCreate(['naziv' => $tipUpita])->id;
        }

        // automatski postavljamo datum i status
        $data['datum']  = now()->toDateString();
        $data['status'] = 'novo';

        // 1) poruka se UVIJEK prvo snima u bazu
        $poruka = Poruka::create($data);

        // 2) email obavještenje — ako ne uspije, posjetilac svejedno dobija potvrdu,
        //    a admin u panelu vidi da mejl nije poslan i može ga poslati ponovo
        $this->posaljiMejl($poruka);

        return response()->json([
            'message' => 'Poruka je uspjesno poslana'
        ], 201);
    }

    public function show(string $id)
    {
        return new PorukaResource(
            Poruka::with(['tip_poruke'])->findOrFail($id)
        );
    }

    // admin mijenja status poruke
    public function promijeniStatus(Request $request, string $id)
    {
        $poruka = Poruka::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:novo,procitano,odgovoreno',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $poruka->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status uspjesno promijenjen',
            'status'  => $poruka->status
        ], 200);
    }

    // admin ponovo šalje poruku na email turističke organizacije
    public function posaljiPonovo(string $id)
    {
        $poruka = Poruka::with('tip_poruke')->findOrFail($id);

        if ($this->posaljiMejl($poruka)) {
            return response()->json([
                'message' => 'Poruka je ponovo poslana na email.',
                'poruka'  => new PorukaResource($poruka->fresh('tip_poruke')),
            ], 200);
        }

        return response()->json([
            'message' => 'Slanje emaila nije uspjelo: ' . $poruka->fresh()->email_greska,
            'poruka'  => new PorukaResource($poruka->fresh('tip_poruke')),
        ], 502);
    }

    public function destroy(string $id)
    {
        $poruka = Poruka::findOrFail($id);
        $poruka->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje poruke'
        ], 200);
    }

    /**
     * Šalje poruku na ADMIN_EMAIL i pamti ishod u bazi.
     * Nikad ne baca izuzetak — vraća true/false.
     */
    private function posaljiMejl(Poruka $poruka): bool
    {
        $primalac = config('mail.admin_email');

        if (!$primalac) {
            $poruka->update([
                'email_poslan_at' => null,
                'email_greska'    => 'ADMIN_EMAIL nije podešen u .env fajlu.',
            ]);
            return false;
        }

        try {
            Mail::to($primalac)->send(new NovaPorukaMail($poruka->loadMissing('tip_poruke')));

            $poruka->update([
                'email_poslan_at' => now(),
                'email_greska'    => null,
            ]);
            return true;
        } catch (\Throwable $e) {
            Log::error('Slanje emaila (poruka #' . $poruka->id . ') nije uspjelo: ' . $e->getMessage());

            $poruka->update([
                'email_poslan_at' => null,
                'email_greska'    => Str::limit($e->getMessage(), 480),
            ]);
            return false;
        }
    }
}