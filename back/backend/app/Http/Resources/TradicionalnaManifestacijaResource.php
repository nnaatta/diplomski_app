<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TradicionalnaManifestacijaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'naslov'     => $this->naslov,
            'naslov_en'  => $this->naslov_en,
            'opis'       => $this->opis,
            'opis_en'    => $this->opis_en,
            'period'     => $this->period,
            'period_en'  => $this->period_en,
            'redoslijed' => $this->redoslijed,
            'aktivan'    => (bool) $this->aktivan,

            // Slike — BelongsToMany, pivot ima glavna i aktivan
            'slike'      => $this->whenLoaded('slike', function () {
                return $this->slike
                    ->filter(fn($s) => $s->pivot->aktivan)
                    ->map(fn($s) => [
                        'id'     => $s->id,
                        'url'    => $s->url,
                        'glavna' => (bool) $s->pivot->glavna,
                    ])
                    ->values();
            }),

            'created_at' => $this->created_at?->format('d.m.Y'),
            'updated_at' => $this->updated_at?->format('d.m.Y'),
        ];
    }
}
