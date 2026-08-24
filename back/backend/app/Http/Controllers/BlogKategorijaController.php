<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogKategorijaResource;
use App\Models\Blog_kategorija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class BlogKategorijaController extends Controller
{
    public function index()
    {
        return BlogKategorijaResource::collection(Blog_kategorija::paginate(10));
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

        $blogKategorija = Blog_kategorija::create($validator->validated());

        $translator = new TranslationService();
        $blogKategorija->naziv_en = $translator->translate($blogKategorija->naziv);
        $blogKategorija->save();

        return response()->json(new BlogKategorijaResource($blogKategorija), 201);
    }

    public function show(string $id)
    {
        return new BlogKategorijaResource(Blog_kategorija::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $blogKategorija = Blog_kategorija::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:250'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspjesna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $blogKategorija->update($validator->validated());

        $translator = new TranslationService();
        $blogKategorija->naziv_en = $translator->translate($blogKategorija->naziv);
        $blogKategorija->save();

        return response()->json(new BlogKategorijaResource($blogKategorija), 200);
    }

    public function destroy(string $id)
    {
        $blogKategorija = Blog_kategorija::findOrFail($id);
        $blogKategorija->delete();

        return response()->json(['message' => 'Uspjesno brisanje objekta'], 200);
    }
}