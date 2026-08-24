<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogPostResource;
use App\Models\Blog_post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\TranslationService;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog_post::with(['autor', 'kategorija', 'blog_slike.slika']);

        if ($request->has('aktivan')) {
            $query->where('aktivan', $request->aktivan);
        }
        if ($request->has('blog_kategorija_id')) {
            $query->where('blog_kategorija_id', $request->blog_kategorija_id);
        }

        return BlogPostResource::collection($query->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naslov'             => 'required|string|max:250',
            'tekst'              => 'required|string',
            'aktivan'            => 'nullable|boolean',
            'autor_id'           => 'nullable|exists:users,id',
            'blog_kategorija_id' => 'nullable|exists:blog_kategorije,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $blogPost = Blog_post::create($validator->validated());

        $translator = new TranslationService();
        $blogPost->naslov_en = $translator->translate($blogPost->naslov);
        $blogPost->tekst_en  = $translator->translate($blogPost->tekst);
        $blogPost->save();

        return response()->json(
            new BlogPostResource($blogPost->load(['autor', 'kategorija', 'blog_slike'])),
            201
        );
    }

    public function show(string $id)
    {
        return new BlogPostResource(
            Blog_post::with(['autor', 'kategorija', 'blog_slike.slika'])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $blogPost = Blog_post::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naslov'             => 'required|string|max:250',
            'tekst'              => 'required|string',
            'aktivan'            => 'nullable|boolean',
            'autor_id'           => 'nullable|exists:users,id',
            'blog_kategorija_id' => 'nullable|exists:blog_kategorije,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Neuspješna validacija',
                'errors'  => $validator->errors()
            ], 422);
        }

        $blogPost->update($validator->validated());

        $translator = new TranslationService();
        $blogPost->naslov_en = $translator->translate($blogPost->naslov);
        $blogPost->tekst_en  = $translator->translate($blogPost->tekst);
        $blogPost->save();

        return response()->json(
            new BlogPostResource($blogPost->load(['autor', 'kategorija', 'blog_slike'])),
            200
        );
    }

    public function destroy(string $id)
    {
        Blog_post::findOrFail($id)->delete();
        return response()->json(['message' => 'Uspješno brisanje objekta'], 200);
    }

    public function toggleAktivan(string $id)
    {
        $blogPost = Blog_post::findOrFail($id);
        $blogPost->update(['aktivan' => !$blogPost->aktivan]);

        return response()->json([
            'message' => $blogPost->aktivan ? 'Blog post objavljen' : 'Blog post povučen',
            'aktivan' => $blogPost->aktivan
        ], 200);
    }
}