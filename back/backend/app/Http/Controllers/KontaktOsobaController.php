<?php

namespace App\Http\Controllers;

use App\Http\Resources\KontaktOsobaResource;
use App\Models\Kontakt_osoba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KontaktOsobaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return KontaktOsobaResource::collection(Kontakt_osoba::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[

            'ime' => 'required|string|max:50',
            'prezime' => 'required|string|max:50',
            'br_telefona' => 'required|string|max:50',
            'uloga' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:100',
            'instagram' => 'nullable|string|max:250',
            'facebook' => 'nullable|string|max:250',
            'web_stranica' => 'nullable|url|max:250'

        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $kontaktOsoba = Kontakt_osoba::create($data);

        return response()->json(
            new KontaktOsobaResource($kontaktOsoba), 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new KontaktOsobaResource(Kontakt_osoba::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kontaktOsoba = Kontakt_osoba::findOrFail($id);

        $validator = Validator::make($request->all(),[

            'ime' => 'required|string|max:50',
            'prezime' => 'required|string|max:50',
            'br_telefona' => 'required|string|max:50',
            'uloga' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:100',
            'instagram' => 'nullable|string|max:250',
            'facebook' => 'nullable|string|max:250',
            'web_stranica' => 'nullable|url|max:250'

        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $kontaktOsoba->update($data);

        return response()->json(
            new KontaktOsobaResource($kontaktOsoba), 200
        );

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kontaktOsoba = Kontakt_osoba::findOrFail($id);
        
        $kontaktOsoba->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje objekta'
        ], 200);
    }
}
