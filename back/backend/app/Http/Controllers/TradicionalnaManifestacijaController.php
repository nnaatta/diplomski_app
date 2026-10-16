<?php

namespace App\Http\Controllers;

use App\Http\Resources\TradicionalnaManifestacijaResource;
use App\Models\TradicionalnaManifestacija;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TradicionalnaManifestacijaController extends Controller
{
    public function index(Request $request)
    {
        $query = TradicionalnaManifestacija::with('slike')
            ->orderBy('redoslijed')
            ->orderBy('id');

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }

        // per_page: javna stranica traži sve odjednom (max 100),
        // admin panel koristi podrazumijevanih 10 po stranici
        $perPage = min(max((int) $request->input('per_page', 10), 1), 100);

        return TradicionalnaManifestacijaResource::collection($query->paginate($perPage));
    }

    public function show(string $id)
    {
        return new TradicionalnaManifestacijaResource(
            TradicionalnaManifestacija::with('slike')->findOrFail($id)
        );
    }

    public function store(Request $request)
    {
        $validator = $this->validator($request);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Ako redoslijed nije zadat — nova manifestacija ide na kraj liste
        if (!isset($data['redoslijed'])) {
            $data['redoslijed'] = ((int) TradicionalnaManifestacija::max('redoslijed')) + 1;
        }

        $manifestacija = TradicionalnaManifestacija::create($data);
        $this->prevedi($manifestacija, ['naslov', 'opis', 'period']);

        return response()->json(
            new TradicionalnaManifestacijaResource($manifestacija->load('slike')),
            201
        );
    }

    public function update(Request $request, string $id)
    {
        $manifestacija = TradicionalnaManifestacija::findOrFail($id);

        $validator = $this->validator($request);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $manifestacija->fill($validator->validated());
        $promijenjena = array_keys($manifestacija->getDirty());
        $manifestacija->save();

        // Prevod se ponovo traži samo za polja koja su se promijenila
        $this->prevedi($manifestacija, $promijenjena);

        return response()->json(
            new TradicionalnaManifestacijaResource($manifestacija->load('slike')),
            200
        );
    }

    public function destroy(string $id)
    {
        $manifestacija = TradicionalnaManifestacija::findOrFail($id);

        $slikaIdovi = $manifestacija->slike()->pluck('slike.id')->all();

        $manifestacija->slike()->detach();
        $manifestacija->delete();

        // Brišemo slike (fajl + red) koje se više nigdje ne koriste
        foreach ($slikaIdovi as $slikaId) {
            SlikaController::obrisiSlikuAkoOsirotjela((int) $slikaId);
        }

        return response()->json(['message' => 'Uspješno brisanje manifestacije'], 200);
    }

    // ─── Helperi ─────────────────────────────────────────────────────────────

    private function validator(Request $request)
    {
        return Validator::make($request->all(), [
            'naslov'     => 'required|string|max:250',
            'opis'       => 'nullable|string',
            'period'     => 'nullable|string|max:100',
            'redoslijed' => 'nullable|integer|min:0',
            'aktivan'    => 'nullable|boolean',
        ]);
    }

    /**
     * Automatski engleski prevod za naslov, opis i period.
     * Prevodi samo polja koja su se promijenila ili još nemaju prevod.
     */
    private function prevedi(TradicionalnaManifestacija $m, array $promijenjena): void
    {
        $translator = new TranslationService();

        foreach (['naslov', 'opis', 'period'] as $polje) {
            $kolonaEn = "{$polje}_en";

            if (!in_array($polje, $promijenjena, true) && !empty($m->{$kolonaEn})) {
                continue;
            }

            $tekst = trim((string) $m->{$polje});
            $m->{$kolonaEn} = $tekst === '' ? null : $translator->translate($tekst);
        }

        $m->save();
    }
}
