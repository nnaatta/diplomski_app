<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SmjestajResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'naziv'            => $this->naziv,
            'naziv_en'         => $this->naziv_en,
            'opis'             => $this->opis,
            'opis_en'          => $this->opis_en,
            'br_soba'          => $this->br_soba,
            'br_lezajeva'      => $this->br_lezajeva,
            'aktivan'          => (bool) $this->aktivan,

            'lokacija_id'      => $this->lokacija_id,
            'tip_smjestaja_id' => $this->tip_smjestaja_id,
            'kontakt_osoba_id' => $this->kontakt_osoba_id,

            'lokacija'         => new LokacijaResource($this->whenLoaded('lokacija')),
            'tip_smjestaja'    => new TipSmjestajaResource($this->whenLoaded('tip_smjestaja')),

            // kontakt_osoba — br_telefona -> telefon alias za front
            'kontakt_osoba'    => $this->whenLoaded('kontakt_osoba', function () {
                $k = $this->kontakt_osoba;
                if (!$k) return null;
                return [
                    'id'          => $k->id,
                    'ime_prezime' => $k->ime . ' ' . $k->prezime,
                    'ime'         => $k->ime,
                    'prezime'     => $k->prezime,
                    'telefon'     => $k->br_telefona,
                    'uloga'       => $k->uloga,
                    'email'       => $k->email,
                ];
            }),

            // pogodnosti — puni objekti (front čita naziv i ikona)
            'pogodnosti'       => $this->whenLoaded('pogodnosti', fn() =>
                $this->pogodnosti->map(fn($p) => [
                    'id'       => $p->id,
                    'naziv'    => $p->naziv,
                    'naziv_en' => $p->naziv_en,
                    'ikona'    => $p->ikona,
                ])->values()
            ),

            // slike — smjestaj_slike hasMany -> slika
            'slike'            => $this->whenLoaded('smjestaj_slike', function () {
                $base = rtrim(config('app.url'), '/');
                return $this->smjestaj_slike
                    ->filter(fn($ss) => $ss->aktivan && $ss->slika)
                    ->sortByDesc('glavna')
                    ->map(fn($ss) => [
                        'id'     => $ss->slika->id,
                        'url'    => str_starts_with($ss->slika->url, 'http')
                                    ? $ss->slika->url
                                    : $base . $ss->slika->url,
                        'glavna' => (bool) $ss->glavna,
                    ])
                    ->values();
            }),

            'created_at'       => $this->created_at?->format('d.m.Y'),
            'updated_at'       => $this->updated_at?->format('d.m.Y'),
        ];
    }
}