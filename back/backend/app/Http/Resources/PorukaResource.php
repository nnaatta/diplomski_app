<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PorukaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'ime_prezime' => $this->ime . ' ' . $this->prezime,
            'ime'         => $this->ime,
            'prezime'     => $this->prezime,
            'email'       => $this->email,
            'br_tel'      => $this->br_tel,
            'naslov'      => $this->naslov,
            'tekst'       => $this->tekst,
            'datum'       => $this->datum?->format('d.m.Y'),
            'status'      => $this->status,
            'je_procitana' => $this->status !== 'novo',

            // relacije
            'tip_poruke' => new TipPorukeResource($this->whenLoaded('tip_poruke')),

            'created_at' => $this->created_at?->format('d.m.Y'),
        ];
    }
}
