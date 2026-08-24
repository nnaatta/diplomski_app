<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TuristickiSadrzajResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $slike = [];
        if ($this->relationLoaded('slika') && $this->slika) {
            $slike = [['id' => $this->slika->id, 'url' => $this->slika->url, 'glavna' => true]];
        }

        return [
            'id'              => $this->id,
            'naslov'          => $this->naslov,
            'naslov_en'       => $this->naslov_en,
            'opis'            => $this->opis,
            'opis_en'         => $this->opis_en,
            'aktivan'         => (bool) $this->aktivan,
            'duzina_staze'    => $this->duzina_staze,
            'tezina'          => $this->tezina,

            // Raw FK ID-evi za forme
            'lokacija_id'     => $this->lokacija_id,
            'tip_sadrzaja_id' => $this->tip_sadrzaja_id,
            'slika_id'        => $this->slika_id,

            // Relacije — nazivi iz originalnog modela (snake_case)
            'lokacija'        => new LokacijaResource($this->whenLoaded('lokacija')),
            'tip_sadrzaja'    => new TipSadrzajaResource($this->whenLoaded('tip_sadrzaja')),

            'slike'           => $slike,

            'created_at'      => $this->created_at?->format('d.m.Y'),
            'updated_at'      => $this->updated_at?->format('d.m.Y'),
        ];
    }
}