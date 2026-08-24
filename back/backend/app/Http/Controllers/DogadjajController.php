<?php

namespace App\Http\Controllers;

use App\Http\Resources\DogadjajResource;
use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class DogadjajController extends Controller
{
    public function index(Request $request)
    {
        $query = Dogadjaj::with(['lokacija', 'kategorija', 'kontakt_osoba', 'slika']);

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }
        if ($request->has('kategorija_id')) {
            $query->where('kategorija_id', $request->kategorija_id);
        }
        if ($request->has('predstojeći') && $request->{'predstojeći'}) {
            $query->where('datum_od', '>=', now());
        }
        if ($request->has('prosli') && $request->prosli) {
            $query->where('datum_od', '<', now());
        }

        $query->orderBy('datum_od', 'desc');

        return DogadjajResource::collection($query->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naslov'           => 'required|string|max:250',
            'opis'             => 'nullable|string',
            'datum_od'         => 'required|date',
            'datum_do'         => 'nullable|date|after_or_equal:datum_od',
            'vrijeme'          => 'nullable|date_format:H:i',
            'aktivan'          => 'nullable|boolean',
            'lokacija_id'      => 'nullable|exists:lokacije,id',
            'kategorija_id'    => 'nullable|exists:dogadjaj_kategorije,id',
            'kontakt_osoba_id' => 'nullable|exists:kontakt_osobe,id',
            'slika_id'         => 'nullable|exists:slike,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $dogadjaj = Dogadjaj::create($validator->validated());

        $translator = new TranslationService();
        $dogadjaj->naslov_en = $translator->translate($dogadjaj->naslov);
        $dogadjaj->opis_en   = $translator->translate($dogadjaj->opis);
        $dogadjaj->save();

        return response()->json(
            new DogadjajResource($dogadjaj->load(['lokacija', 'kategorija', 'kontakt_osoba', 'slika'])),
            201
        );
    }

    public function show(string $id)
    {
        return new DogadjajResource(
            Dogadjaj::with(['lokacija', 'kategorija', 'kontakt_osoba', 'slika'])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naslov'           => 'required|string|max:250',
            'opis'             => 'nullable|string',
            'datum_od'         => 'required|date',
            'datum_do'         => 'nullable|date|after_or_equal:datum_od',
            'vrijeme'          => 'nullable|date_format:H:i',
            'aktivan'          => 'nullable|boolean',
            'lokacija_id'      => 'nullable|exists:lokacije,id',
            'kategorija_id'    => 'nullable|exists:dogadjaj_kategorije,id',
            'kontakt_osoba_id' => 'nullable|exists:kontakt_osobe,id',
            'slika_id'         => 'nullable|exists:slike,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $dogadjaj->update($validator->validated());

        $translator = new TranslationService();
        $dogadjaj->naslov_en = $translator->translate($dogadjaj->naslov);
        $dogadjaj->opis_en   = $translator->translate($dogadjaj->opis);
        $dogadjaj->save();

        return response()->json(
            new DogadjajResource($dogadjaj->load(['lokacija', 'kategorija', 'kontakt_osoba', 'slika'])),
            200
        );
    }

    public function destroy(string $id)
    {
        Dogadjaj::findOrFail($id)->delete();
        return response()->json(['message' => 'Uspješno brisanje objekta'], 200);
    }
}