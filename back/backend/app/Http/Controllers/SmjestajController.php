<?php

namespace App\Http\Controllers;

use App\Http\Resources\SmjestajResource;
use App\Models\Smjestaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class SmjestajController extends Controller
{
    public function index(Request $request)
    {
        // Koristimo nazive relacija iz originalnog Smjestaj modela:
        // lokacija, tip_smjestaja, kontakt_osoba, pogodnosti, smjestaj_slike
        $query = Smjestaj::with(['lokacija', 'tip_smjestaja', 'kontakt_osoba', 'pogodnosti', 'smjestaj_slike.slika']);

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }
        if ($request->has('tip_smjestaja_id')) {
            $query->where('tip_smjestaja_id', $request->tip_smjestaja_id);
        }

        return SmjestajResource::collection($query->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv'            => 'required|string|max:250',
            'opis'             => 'nullable|string',
            'br_soba'          => 'nullable|integer|min:0',
            'br_lezajeva'      => 'nullable|integer|min:0',
            'aktivan'          => 'nullable|boolean',
            'lokacija_id'      => 'nullable|exists:lokacije,id',
            'tip_smjestaja_id' => 'nullable|exists:tipovi_smjestaja,id',
            'kontakt_osoba_id' => 'nullable|exists:kontakt_osobe,id',
            'pogodnosti'       => 'nullable|array',
            'pogodnosti.*'     => 'exists:pogodnosti,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $pogodnosti = $request->input('pogodnosti', []);
        $data = collect($validator->validated())->except('pogodnosti')->toArray();

        $smjestaj = Smjestaj::create($data);
        $smjestaj->pogodnosti()->sync($pogodnosti);
        $translator = new TranslationService();
        $smjestaj->naziv_en = $translator->translate($smjestaj->naziv);
        $smjestaj->opis_en  = $translator->translate($smjestaj->opis);
        $smjestaj->save();

        return response()->json(
            new SmjestajResource($smjestaj->load(['lokacija', 'tip_smjestaja', 'kontakt_osoba', 'pogodnosti', 'smjestaj_slike'])),
            201
        );
    }

    public function show(string $id)
    {
        return new SmjestajResource(
            Smjestaj::with(['lokacija', 'tip_smjestaja', 'kontakt_osoba', 'pogodnosti', 'smjestaj_slike.slika'])
                ->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $smjestaj = Smjestaj::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv'            => 'required|string|max:250',
            'opis'             => 'nullable|string',
            'br_soba'          => 'nullable|integer|min:0',
            'br_lezajeva'      => 'nullable|integer|min:0',
            'aktivan'          => 'nullable|boolean',
            'lokacija_id'      => 'nullable|exists:lokacije,id',
            'tip_smjestaja_id' => 'nullable|exists:tipovi_smjestaja,id',
            'kontakt_osoba_id' => 'nullable|exists:kontakt_osobe,id',
            'pogodnosti'       => 'nullable|array',
            'pogodnosti.*'     => 'exists:pogodnosti,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $pogodnosti = $request->input('pogodnosti', []);
        $data = collect($validator->validated())->except('pogodnosti')->toArray();

        $smjestaj->update($data);
        $smjestaj->pogodnosti()->sync($pogodnosti);
        $translator = new TranslationService();
        $smjestaj->naziv_en = $translator->translate($smjestaj->naziv);
        $smjestaj->opis_en  = $translator->translate($smjestaj->opis);
        $smjestaj->save();

        return response()->json(
            new SmjestajResource($smjestaj->load(['lokacija', 'tip_smjestaja', 'kontakt_osoba', 'pogodnosti', 'smjestaj_slike'])),
            200
        );
    }

    public function destroy(string $id)
    {
        Smjestaj::findOrFail($id)->delete();
        return response()->json(['message' => 'Uspješno brisanje objekta'], 200);
    }
}