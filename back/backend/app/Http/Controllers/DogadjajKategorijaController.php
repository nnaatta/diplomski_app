<?php

namespace App\Http\Controllers;

use App\Http\Resources\DogadjajKategorijaResource;
use App\Models\Dogadjaj_kategorija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class DogadjajKategorijaController extends Controller
{
    public function index()
    {
        return DogadjajKategorijaResource::collection(Dogadjaj_kategorija::paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'naziv' => 'required|string|250'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ], 422);
        };

        $data = $validator->validated();
        $dogadjaKategorija = Dogadjaj_kategorija::create($data);

        $translator = new TranslationService();
        $dogadjaKategorija->naziv_en = $translator->translate($dogadjaKategorija->naziv);
        $dogadjaKategorija->save();

        return response()->json( new DogadjajKategorijaResource($dogadjaKategorija),201);
    }

    public function show(string $id)
    {
        return new DogadjajKategorijaResource(Dogadjaj_kategorija::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $dogadjaKategorija = Dogadjaj_kategorija::findOrFail($id);

        $validator = Validator::make($request->all(),[
            'naziv' => 'required|string|250'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ], 422);
        };

        $data = $validator->validated();
        $dogadjaKategorija->update($data);

        $translator = new TranslationService();
        $dogadjaKategorija->naziv_en = $translator->translate($dogadjaKategorija->naziv);
        $dogadjaKategorija->save();

        return response()->json( new DogadjajKategorijaResource($dogadjaKategorija),200);
    }

    public function destroy(string $id)
    {
        $dogadjaKategorija = Dogadjaj_kategorija::findOrFail($id);

        $dogadjaKategorija->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje objekta'
        ],200);
    }
}