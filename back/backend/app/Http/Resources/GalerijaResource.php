<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalerijaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'naslov'    => $this->naslov,
            'naslov_en' => $this->naslov_en,
            'aktivan'   => (bool) $this->aktivan,

            // relacije
            'kategorija' => new GalerijaKategorijaResource($this->whenLoaded('kategorija')),
            'slike'      => SlikaResource::collection($this->whenLoaded('galerija_slike')),

            'created_at' => $this->created_at?->format('d.m.Y'),
            'updated_at' => $this->updated_at?->format('d.m.Y'),
        ];
    }
}