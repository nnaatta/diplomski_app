<?php

namespace App\Http\Controllers;

use App\Http\Resources\LokacijaResource;
use App\Models\Lokacija;
use App\Services\GoogleMapsLinkParser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LokacijaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function index(Request $request)
{
    $query = Lokacija::query();

    if ($request->has('aktivan')) {
        $query->where('aktivan', $request->aktivan);
    }

    return LokacijaResource::collection($query->paginate(10));
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[

            'naziv' => 'required|string|max:250',
            'adresa' => 'required|string|max:250',
            'lat' => 'nullable|numeric|between:-90,90',
            'lng' => 'nullable|numeric|between:-180,180',
            'google_maps_link' => 'nullable|string|max:2000',
            'aktivan' => 'nullable|boolean'

        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ],422);
        }

        $data = $validator -> validated();

        // Google Maps link -> automatski lat/lng
        $greska = $this->primijeniGoogleMapsLink($data);
        if ($greska) {
            return $greska;
        }

        $lokacija = Lokacija::create($data);

        return response()->json(
            new LokacijaResource($lokacija), 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new LokacijaResource(Lokacija::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $lokacija = Lokacija::findOrFail($id);
        
        $validator = Validator::make($request->all(),[

            'naziv' => 'required|string|max:250',
            'adresa' => 'required|string|max:250',
            'lat' => 'nullable|numeric|between:-90,90',
            'lng' => 'nullable|numeric|between:-180,180',
            'google_maps_link' => 'nullable|string|max:2000',
            'aktivan' => 'nullable|boolean'

        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator -> validated();

        // Google Maps link -> automatski lat/lng
        $greska = $this->primijeniGoogleMapsLink($data);
        if ($greska) {
            return $greska;
        }

        $lokacija->update($data);

        return response()->json(
            new LokacijaResource($lokacija),200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lokacija = Lokacija::findorFail($id);

        $lokacija->delete();

        return response()->json([
            'message' => 'Objekat je uspjesno obrisan'
        ], 200);
    }

    /**
     * Ako je poslat google_maps_link, iz njega izvlači koordinate i upisuje ih
     * u $data kao lat/lng. Ako link nije prepoznat, vraća 422 odgovor.
     * Ako link nije poslat, lat/lng ostaju kakvi jesu.
     */
    private function primijeniGoogleMapsLink(array &$data)
    {
        $link = $data['google_maps_link'] ?? null;
        unset($data['google_maps_link']);

        if (!filled($link)) {
            return null;
        }

        $koordinate = (new GoogleMapsLinkParser())->parse($link);

        if (!$koordinate) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => [
                    'google_maps_link' => [
                        'Link nije prepoznat. Kopiraj link iz Google Maps (adresna traka ili dugme Dijeli).',
                    ],
                ],
            ], 422);
        }

        $data['lat'] = $koordinate['lat'];
        $data['lng'] = $koordinate['lng'];

        return null;
    }
}