<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        // provjeravamo kredencijale
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json([
                'message' => 'Pogrešan email ili lozinka'
            ], 401);
        }

        $user = Auth::user();

        // provjeravamo da li je admin aktivan
        if (!$user->aktivan) {
            return response()->json([
                'message' => 'Vaš nalog je deaktiviran'
            ], 403);
        }

        // brišemo stare tokene i kreiramo novi
        $user->tokens()->delete();
        $token = $user->createToken('admin-token')->plainTextToken;

        // ažuriramo poslednji login
        $user->update(['poslednji_login' => now()]);

        return response()->json([
            'message' => 'Uspješna prijava',
            'token'   => $token,
            'user'    => [
                'id'          => $user->id,
                'ime_prezime' => $user->ime . ' ' . $user->prezime,
                'email'       => $user->email,
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        // brišemo trenutni token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Uspješna odjava'
        ], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id'             => $user->id,
            'ime_prezime'    => $user->ime . ' ' . $user->prezime,
            'email'          => $user->email,
            'poslednji_login' => $user->poslednji_login?->format('d.m.Y H:i'),
        ], 200);
    }
}
