<?php

namespace App\Http\Controllers;

use App\Http\Resources\PorukaResource;
use App\Models\Poruka;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PorukaController extends Controller
{
    public function index(Request $request)
    {
        $query = Poruka::with(['tip_poruke']);

        // filter po statusu
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // filter po tipu poruke
        if ($request->has('tip_poruke_id')) {
            $query->where('tip_poruke_id', $request->tip_poruke_id);
        }

        // najnovije poruke prvo
        $query->orderBy('created_at', 'desc');

        return PorukaResource::collection($query->paginate(10));
    }

    // ovu metodu poziva javni dio sajta (kontakt forma)
    // nije zaštićena auth middleware-om
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime'          => 'required|string|max:100',
            'prezime'      => 'required|string|max:100',
            'email'        => 'required|email|max:250',
            'br_tel'       => 'nullable|string|max:20',
            'naslov'       => 'required|string|max:250',
            'tekst'        => 'required|string',
            'tip_poruke_id' => 'nullable|exists:tipovi_poruke,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        // automatski postavljamo datum i status
        $data = $validator->validated();
        $data['datum']  = now()->toDateString();
        $data['status'] = 'novo';

        $poruka = Poruka::create($data);

        // email notifikacija adminu
        Mail::raw(
            "Nova poruka od: {$poruka->ime} {$poruka->prezime}\n" .
            "Email: {$poruka->email}\n" .
            "Naslov: {$poruka->naslov}\n\n" .
            "{$poruka->tekst}",
            function ($message) use ($poruka) {
                $message->to(config('mail.admin_email'))
                        ->subject("Nova poruka: {$poruka->naslov}");
            }
        );

        return response()->json([
            'message' => 'Poruka je uspjesno poslana'
        ], 201);
    }

    public function show(string $id)
    {
        return new PorukaResource(
            Poruka::with(['tip_poruke'])->findOrFail($id)
        );
    }

    // admin mijenja status poruke
    public function promijeniStatus(Request $request, string $id)
    {
        $poruka = Poruka::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:novo,procitano,odgovoreno',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $poruka->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status uspjesno promijenjen',
            'status'  => $poruka->status
        ], 200);
    }

    public function destroy(string $id)
    {
        $poruka = Poruka::findOrFail($id);
        $poruka->delete();

        return response()->json([
            'message' => 'Uspjesno brisanje poruke'
        ], 200);
    }
}
