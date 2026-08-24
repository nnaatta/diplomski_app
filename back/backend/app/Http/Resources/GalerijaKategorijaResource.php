<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalerijaKategorijaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'naziv' => $this->naziv,
            'naziv_en' => $this->naziv_en,
        ];
    }
}
