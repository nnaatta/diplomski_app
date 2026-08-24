<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestoranResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'naziv'            => $this->naziv,
            'naziv_en'         => $this->naziv_en,
            'opis'             => $this->opis,
            'opis_en'          => $this->opis_en,
            'radno_vrijeme'    => $this->radno_vrijeme,
            'aktivan'          => (bool) $this->aktivan,

            // Raw FK ID-evi za forme
            'lokacija_id'      => $this->lokacija_id,
            'kontakt_osoba_id' => $this->kontakt_osoba_id,

            'lokacija'         => new LokacijaResource($this->whenLoaded('lokacija')),
            'kontakt_osoba'    => new KontaktOsobaResource($this->whenLoaded('kontaktOsoba')),

            // Pogodnosti — niz ID-eva
            'pogodnosti'       => $this->whenLoaded('pogodnosti', fn() =>
                $this->pogodnosti->pluck('id')->toArray()
            ),

            // Preporuke hrane — puni objekti sa _en
            'preporuke_hrane'  => $this->whenLoaded('preporukeHrane', fn() =>
                $this->preporukeHrane->map(fn($p) => [
                    'id'       => $p->id,
                    'naziv'    => $p->naziv,
                    'naziv_en' => $p->naziv_en,
                ])->values()
            ),

            // Slike — BelongsToMany, pivot ima glavna i aktivan
            'slike'            => $this->whenLoaded('slike', function () {
                return $this->slike
                    ->filter(fn($s) => $s->pivot->aktivan)
                    ->map(fn($s) => [
                        'id'     => $s->id,
                        'url'    => $s->url,
                        'glavna' => (bool) $s->pivot->glavna,
                    ])
                    ->values();
            }),

            'created_at'       => $this->created_at?->format('d.m.Y'),
            'updated_at'       => $this->updated_at?->format('d.m.Y'),
        ];
    }
}