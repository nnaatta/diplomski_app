<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlikaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Pokušavamo pročitati 'glavna' iz bilo koje pivot tabele
        $glavna = $this->whenPivotLoaded('smjestaj_slike',           fn() => (bool) $this->pivot->glavna)
               ?? $this->whenPivotLoaded('restoran_slike',           fn() => (bool) $this->pivot->glavna)
               ?? $this->whenPivotLoaded('blog_slike',               fn() => (bool) $this->pivot->glavna)
               ?? $this->whenPivotLoaded('galerija_slike',           fn() => (bool) $this->pivot->glavna)
               ?? $this->whenPivotLoaded('turisticki_sadrzaj_slike', fn() => (bool) $this->pivot->glavna)
               ?? $this->whenPivotLoaded('dogadjaj_slike',           fn() => (bool) $this->pivot->glavna);

        return [
            'id'       => $this->id,
            'url'      => $this->url,
            'alt_text' => $this->alt_text,
            'opis'     => $this->opis,
            'aktivan'  => (bool) $this->aktivan,
            'glavna'   => $glavna,
        ];
    }
}
