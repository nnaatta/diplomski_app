<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DogadjajResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $base  = rtrim(config('app.url'), '/');
        $slike = [];
        if ($this->relationLoaded('slika') && $this->slika) {
            $url = $this->slika->url;
            $slike = [[
                'id'     => $this->slika->id,
                'url'    => str_starts_with($url, 'http') ? $url : $base . $url,
                'glavna' => true,
            ]];
        }

        // Robusno parsiranje time kolumne — radi sa i bez casta na modelu
        $vrijemeRaw = $this->getRawOriginal('vrijeme') ?? $this->vrijeme;
        $vrijeme = null;
        if ($vrijemeRaw) {
            if ($vrijemeRaw instanceof \DateTimeInterface) {
                $vrijeme = $vrijemeRaw->format('H:i');
            } else {
                $vrijeme = substr((string) $vrijemeRaw, 0, 5);
            }
        }

        return [
            'id'               => $this->id,
            'naslov'           => $this->naslov,
            'naslov_en'        => $this->naslov_en,
            'opis'             => $this->opis,
            'opis_en'          => $this->opis_en,
            'datum_od'         => $this->datum_od?->format('Y-m-d'),
            'datum_do'         => $this->datum_do?->format('Y-m-d'),
            'vrijeme'          => $vrijeme,
            'aktivan'          => (bool) $this->aktivan,

            'lokacija_id'      => $this->lokacija_id,
            'kategorija_id'    => $this->kategorija_id,
            'kontakt_osoba_id' => $this->kontakt_osoba_id,
            'slika_id'         => $this->slika_id,

            'lokacija'         => new LokacijaResource($this->whenLoaded('lokacija')),
            'kategorija'       => new DogadjajKategorijaResource($this->whenLoaded('kategorija')),
            'kontakt_osoba'    => new KontaktOsobaResource($this->whenLoaded('kontakt_osoba')),

            'slike'            => $slike,

            'created_at'       => $this->created_at?->format('d.m.Y'),
            'updated_at'       => $this->updated_at?->format('d.m.Y'),
        ];
    }
}