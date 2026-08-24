<?php

namespace App\Http\Controllers;

use App\Http\Resources\PogodnostiResource;
use App\Models\Pogodnosti;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class PogodnostiController extends Controller
{
    public function index()
    {
        return PogodnostiResource::collection(Pogodnosti::paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:250',
            'ikona' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $pogodnost = Pogodnosti::create($validator->validated());

        $translator = new TranslationService();
        $pogodnost->naziv_en = $translator->translate($pogodnost->naziv);
        $pogodnost->save();

        return response()->json(new PogodnostiResource($pogodnost), 201);
    }

    public function show(string $id)
    {
        return new PogodnostiResource(Pogodnosti::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $pogodnost = Pogodnosti::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:250',
            'ikona' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $pogodnost->update($validator->validated());

        $translator = new TranslationService();
        $pogodnost->naziv_en = $translator->translate($pogodnost->naziv);
        $pogodnost->save();

        return response()->json(new PogodnostiResource($pogodnost), 200);
    }

    public function destroy(string $id)
    {
        $pogodnost = Pogodnosti::findOrFail($id);
        $pogodnost->delete();

        return response()->json(['message' => 'Uspjesno brisanje objekta'], 200);
    }
}