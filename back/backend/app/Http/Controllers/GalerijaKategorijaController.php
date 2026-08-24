<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalerijaKategorijaResource;
use App\Models\Galerija_kategorija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class GalerijaKategorijaController extends Controller
{
    public function index()
    {
        return GalerijaKategorijaResource::collection(Galerija_kategorija::paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:250'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $galerijaKategorija = Galerija_kategorija::create($validator->validated());

        $translator = new TranslationService();
        $galerijaKategorija->naziv_en = $translator->translate($galerijaKategorija->naziv);
        $galerijaKategorija->save();

        return response()->json(new GalerijaKategorijaResource($galerijaKategorija), 201);
    }

    public function show(string $id)
    {
        return new GalerijaKategorijaResource(Galerija_kategorija::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $galerijaKategorija = Galerija_kategorija::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:250'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $galerijaKategorija->update($validator->validated());

        $translator = new TranslationService();
        $galerijaKategorija->naziv_en = $translator->translate($galerijaKategorija->naziv);
        $galerijaKategorija->save();

        return response()->json(new GalerijaKategorijaResource($galerijaKategorija), 200);
    }

    public function destroy(string $id)
    {
        $galerijaKategorija = Galerija_kategorija::findOrFail($id);
        $galerijaKategorija->delete();

        return response()->json(['message' => 'Uspjesno brisanje objekta'], 200);
    }
}