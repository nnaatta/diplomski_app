<?php

namespace App\Http\Controllers;

use App\Http\Resources\TuristickiSadrzajResource;
use App\Models\Turisticki_sadrzaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class TuristickiSadrzajController extends Controller
{
    public function index(Request $request)
    {
        $query = Turisticki_sadrzaj::with(['lokacija', 'tip_sadrzaja', 'slika']);

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }
        if ($request->has('tip_sadrzaja_id')) {
            $query->where('tip_sadrzaja_id', $request->tip_sadrzaja_id);
        }

        return TuristickiSadrzajResource::collection($query->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naslov'          => 'required|string|max:250',
            'opis'            => 'nullable|string',
            'aktivan'         => 'nullable|boolean',
            'lokacija_id'     => 'nullable|exists:lokacije,id',
            'tip_sadrzaja_id' => 'nullable|exists:tipovi_sadrzaja,id',
            'slika_id'        => 'nullable|exists:slike,id',
            'duzina_staze'    => 'nullable|numeric|min:0',
            'tezina'          => 'nullable|in:laka,srednja,teska',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $sadrzaj = Turisticki_sadrzaj::create($validator->validated());

        $translator = new TranslationService();
        $sadrzaj->naslov_en = $translator->translate($sadrzaj->naslov);
        $sadrzaj->opis_en   = $translator->translate($sadrzaj->opis);
        $sadrzaj->save();

        return response()->json(
            new TuristickiSadrzajResource($sadrzaj->load(['lokacija', 'tip_sadrzaja', 'slika'])),
            201
        );
    }

    public function show(string $id)
    {
        return new TuristickiSadrzajResource(
            Turisticki_sadrzaj::with(['lokacija', 'tip_sadrzaja', 'slika'])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $sadrzaj = Turisticki_sadrzaj::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naslov'          => 'required|string|max:250',
            'opis'            => 'nullable|string',
            'aktivan'         => 'nullable|boolean',
            'lokacija_id'     => 'nullable|exists:lokacije,id',
            'tip_sadrzaja_id' => 'nullable|exists:tipovi_sadrzaja,id',
            'slika_id'        => 'nullable|exists:slike,id',
            'duzina_staze'    => 'nullable|numeric|min:0',
            'tezina'          => 'nullable|in:laka,srednja,teska',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $sadrzaj->update($validator->validated());

        $translator = new TranslationService();
        $sadrzaj->naslov_en = $translator->translate($sadrzaj->naslov);
        $sadrzaj->opis_en   = $translator->translate($sadrzaj->opis);
        $sadrzaj->save();

        return response()->json(
            new TuristickiSadrzajResource($sadrzaj->load(['lokacija', 'tip_sadrzaja', 'slika'])),
            200
        );
    }

    public function destroy(string $id)
    {
        Turisticki_sadrzaj::findOrFail($id)->delete();
        return response()->json(['message' => 'Uspješno brisanje objekta'], 200);
    }
}