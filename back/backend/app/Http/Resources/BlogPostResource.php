<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'naslov'             => $this->naslov,
            'naslov_en'          => $this->naslov_en,
            'tekst'              => $this->tekst,
            'tekst_en'           => $this->tekst_en,
            'aktivan'            => (bool) $this->aktivan,

            'autor_id'           => $this->autor_id,
            'blog_kategorija_id' => $this->blog_kategorija_id,

            'autor'              => new UserResource($this->whenLoaded('autor')),
            'kategorija'         => new BlogKategorijaResource($this->whenLoaded('kategorija')),

            // slike — blog_slike hasMany -> slika
            'slike'              => $this->whenLoaded('blog_slike', function () {
                $base = rtrim(config('app.url'), '/');
                return $this->blog_slike
                    ->filter(fn($bs) => $bs->aktivan && $bs->slika)
                    ->sortByDesc('glavna')
                    ->map(fn($bs) => [
                        'id'     => $bs->slika->id,
                        'url'    => str_starts_with($bs->slika->url, 'http')
                                    ? $bs->slika->url
                                    : $base . $bs->slika->url,
                        'glavna' => (bool) $bs->glavna,
                    ])
                    ->values();
            }),

            'created_at'         => $this->created_at?->format('d.m.Y'),
            'updated_at'         => $this->updated_at?->format('d.m.Y'),
        ];
    }
}