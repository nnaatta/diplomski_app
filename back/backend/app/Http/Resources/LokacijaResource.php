<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LokacijaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'     => $this->id,
            'naziv'  => $this->naziv,
            'adresa' => $this->adresa,
            'lat'    => $this->lat,
            'lng'    => $this->lng,
            'aktivan' => (bool) $this->aktivan,
        ];
    }
}
