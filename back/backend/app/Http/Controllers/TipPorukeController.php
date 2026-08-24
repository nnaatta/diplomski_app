<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipPorukeResource;
use App\Models\Tip_poruke;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipPorukeController extends Controller
{
    public function index()
    {
        return TipPorukeResource::collection(Tip_poruke::paginate(10));
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

        $tipPoruke = Tip_poruke::create($validator->validated());

        return response()->json(new TipPorukeResource($tipPoruke), 201);
    }

    public function show(string $id)
    {
        return new TipPorukeResource(Tip_poruke::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $tipPoruke = Tip_poruke::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:250'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $tipPoruke->update($validator->validated());

        return response()->json(new TipPorukeResource($tipPoruke), 200);
    }

    public function destroy(string $id)
    {
        $tipPoruke = Tip_poruke::findOrFail($id);
        $tipPoruke->delete();

        return response()->json(['message' => 'Uspjesno brisanje objekta'], 200);
    }
}
