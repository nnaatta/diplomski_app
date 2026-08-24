<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipSadrzajaResource;
use App\Models\Tip_sadrzaja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class TipSadrzajaController extends Controller
{
    public function index()
    {
        return TipSadrzajaResource::collection(Tip_sadrzaja::paginate(10));
    }

    public function store(Request $request)
    {
       $validator = Validator::make($request -> all(),[
            'naziv' => 'required|string|max:250'
       ]);

       if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ],422 );
       }

       $data = $validator->validated();
       $tipSadrzaja = Tip_sadrzaja::create($data);

       $translator = new TranslationService();
       $tipSadrzaja->naziv_en = $translator->translate($tipSadrzaja->naziv);
       $tipSadrzaja->save();

       return response()->json(
        new TipSadrzajaResource($tipSadrzaja),201);
    }

    public function show(string $id)
    {
        return new TipSadrzajaResource(Tip_sadrzaja::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $tipSadrzaja = Tip_sadrzaja::findOrFail($id);

        $validator = Validator::make($request-> all(),[
            'naziv' => 'required|string|max:250'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $tipSadrzaja->update($data);

        $translator = new TranslationService();
        $tipSadrzaja->naziv_en = $translator->translate($tipSadrzaja->naziv);
        $tipSadrzaja->save();

        return response()->json(new TipSadrzajaResource($tipSadrzaja),200);
    }

    public function destroy(string $id)
    {
        $tipSadrzaja = Tip_sadrzaja::findOrFail($id);

        $tipSadrzaja->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje objekta '
        ],200);
    }
}