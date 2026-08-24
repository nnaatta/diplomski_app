<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\TipSmjestajaResource;
use App\Models\Tip_smjestaja;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use App\Services\TranslationService;

class TipSmjestajaController extends Controller
{
    public function index()
    {
        return TipSmjestajaResource::collection(Tip_smjestaja::paginate(10));
    }

    public function store(Request $request)
    {
        $validator = FacadesValidator::make($request -> all(),[
            'naziv' => 'required|string|max:250'
        ]);

        if($validator->fails()){
            return response() -> json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator -> errors(),
            ],422);
        }

        $data = $validator->validated();
        $tipSmjestaja = Tip_smjestaja::create($data);

        $translator = new TranslationService();
        $tipSmjestaja->naziv_en = $translator->translate($tipSmjestaja->naziv);
        $tipSmjestaja->save();

        return response()->json(new TipSmjestajaResource($tipSmjestaja), 201);
    }

    public function show(string $id)
    {
        return new TipSmjestajaResource(Tip_smjestaja::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $tipSmjestaja = Tip_smjestaja::find($id);

        if(!$tipSmjestaja){
            return response()->json([
                'message' => 'Objekat nije pronadjen'
            ], 404);
        };

        $validator = FacadesValidator::make($request -> all(),[
            'naziv' => 'required|string|max:250'
        ]);

        if($validator->fails()){
            return response() -> json([
                'message' => 'Neuspjesna validacija',
                'errors' => $validator -> errors(),
            ],422);
        };

        $data = $validator->validated();
        $tipSmjestaja->update($data);

        $translator = new TranslationService();
        $tipSmjestaja->naziv_en = $translator->translate($tipSmjestaja->naziv);
        $tipSmjestaja->save();

        return response()->json(new TipSmjestajaResource($tipSmjestaja),200);
    }

    public function destroy(string $id)
    {
        $tipSmjestaja = Tip_smjestaja::find($id);

        if(!$tipSmjestaja){
            return response()->json([
                'message' => 'Objekat nije pronadjen'
            ], 404);
        };

        $tipSmjestaja->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje objekta'
        ], 200);
    }
}