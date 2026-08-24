<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestoranResource;
use App\Models\Restoran;
use App\Models\PreporukaHrane;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class RestoranController extends Controller
{
    public function index(Request $request)
    {
        $query = Restoran::with(['lokacija', 'kontaktOsoba', 'pogodnosti', 'preporukeHrane', 'slike']);

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }

        // FIX: vraćamo direktno bez response()->json() wrappera
        // Tako Laravel automatski generiše meta.total koji koristi Dashboard
        return RestoranResource::collection($query->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv'             => 'required|string|max:250',
            'opis'              => 'nullable|string',
            'radno_vrijeme'     => 'nullable|string|max:100',
            'aktivan'           => 'nullable|boolean',
            'lokacija_id'       => 'nullable|exists:lokacije,id',
            'kontakt_osoba_id'  => 'nullable|exists:kontakt_osobe,id',
            'pogodnosti'        => 'nullable|array',
            'pogodnosti.*'      => 'exists:pogodnosti,id',
            'preporuke_hrane'   => 'nullable|array',
            'preporuke_hrane.*' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $pogodnosti     = $request->input('pogodnosti', []);
        $preporukeHrane = $request->input('preporuke_hrane', []);
        $data = collect($validator->validated())
            ->except(['pogodnosti', 'preporuke_hrane'])
            ->toArray();

        $restoran = Restoran::create($data);
        $restoran->pogodnosti()->sync($pogodnosti);

        
        $translator = new TranslationService();
        foreach ($preporukeHrane as $naziv) {
            $naziv = trim($naziv);
            if ($naziv !== '') {
                $preporuka = PreporukaHrane::create(['restoran_id' => $restoran->id, 'naziv' => $naziv]);
                $preporuka->naziv_en = $translator->translate($naziv);
                 $preporuka->save();
    }
}
        $restoran->naziv_en = $translator->translate($restoran->naziv);
        $restoran->opis_en  = $translator->translate($restoran->opis);
        $restoran->save();

        return response()->json(
            new RestoranResource($restoran->load(['lokacija', 'kontaktOsoba', 'pogodnosti', 'preporukeHrane', 'slike'])),
            201
        );
    }

    public function show(string $id)
    {
        return new RestoranResource(
            Restoran::with(['lokacija', 'kontaktOsoba', 'pogodnosti', 'preporukeHrane', 'slike'])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $restoran = Restoran::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv'             => 'required|string|max:250',
            'opis'              => 'nullable|string',
            'radno_vrijeme'     => 'nullable|string|max:100',
            'aktivan'           => 'nullable|boolean',
            'lokacija_id'       => 'nullable|exists:lokacije,id',
            'kontakt_osoba_id'  => 'nullable|exists:kontakt_osobe,id',
            'pogodnosti'        => 'nullable|array',
            'pogodnosti.*'      => 'exists:pogodnosti,id',
            'preporuke_hrane'   => 'nullable|array',
            'preporuke_hrane.*' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $pogodnosti     = $request->input('pogodnosti', []);
        $preporukeHrane = $request->input('preporuke_hrane', []);
        $data = collect($validator->validated())
            ->except(['pogodnosti', 'preporuke_hrane'])
            ->toArray();

        $restoran->update($data);
        $restoran->pogodnosti()->sync($pogodnosti);

        $restoran->preporukeHrane()->delete();
         $translator = new TranslationService();
        foreach ($preporukeHrane as $naziv) {
            $naziv = trim($naziv);
            if ($naziv !== '') {
                $preporuka = PreporukaHrane::create(['restoran_id' => $restoran->id, 'naziv' => $naziv]);
                $preporuka->naziv_en = $translator->translate($naziv);
                 $preporuka->save();
    }
}
        $restoran->naziv_en = $translator->translate($restoran->naziv);
        $restoran->opis_en  = $translator->translate($restoran->opis);
        $restoran->save();

        return response()->json(
            new RestoranResource($restoran->load(['lokacija', 'kontaktOsoba', 'pogodnosti', 'preporukeHrane', 'slike'])),
            200
        );
    }

    public function destroy(string $id)
    {
        Restoran::findOrFail($id)->delete();
        return response()->json(['message' => 'Uspješno brisanje objekta'], 200);
    }
}