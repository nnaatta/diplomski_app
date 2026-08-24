<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KontaktOsobaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'ime_prezime'  => $this->ime . ' ' . $this->prezime,
            'ime'          => $this->ime,
            'prezime'      => $this->prezime,
            'br_telefona'  => $this->br_telefona,
            'telefon'      => $this->br_telefona,   // alias — front čeka 'telefon'
            'uloga'        => $this->uloga,
            'email'        => $this->email,
            'instagram'    => $this->instagram,
            'facebook'     => $this->facebook,
            'web_stranica' => $this->web_stranica,
        ];
    }
}