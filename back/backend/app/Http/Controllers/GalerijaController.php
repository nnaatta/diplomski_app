<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalerijaResource;
use App\Models\Galerija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class GalerijaController extends Controller
{
    public function index(Request $request)
    {
        $query = Galerija::with(['kategorija']);

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }

        if ($request->has('kategorija_id')) {
            $query->where('kategorija_id', $request->kategorija_id);
        }

        return GalerijaResource::collection($query->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naslov'       => 'required|string|max:250',
            'aktivan'      => 'nullable|boolean',
            'kategorija_id' => 'nullable|exists:galerija_kategorije,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $galerija = Galerija::create($validator->validated());

        $translator = new TranslationService();
        $galerija->naslov_en = $translator->translate($galerija->naslov);
        $galerija->save();

        return response()->json(
            new GalerijaResource($galerija->load(['kategorija'])), 201
        );
    }

    public function show(string $id)
    {
        return new GalerijaResource(
            Galerija::with(['kategorija'])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $galerija = Galerija::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naslov'        => 'required|string|max:250',
            'aktivan'       => 'nullable|boolean',
            'kategorija_id' => 'nullable|exists:galerija_kategorije,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $galerija->update($validator->validated());

        $translator = new TranslationService();
        $galerija->naslov_en = $translator->translate($galerija->naslov);
        $galerija->save();

        return response()->json(
            new GalerijaResource($galerija->load(['kategorija'])), 200
        );
    }

    public function destroy(string $id)
    {
        $galerija = Galerija::findOrFail($id);
        $galerija->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje objekta'
        ], 200);
    }
}