<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'ime_prezime' => $this->ime . ' ' . $this->prezime,
            'ime'         => $this->ime,
            'prezime'     => $this->prezime,
            'username'    => $this->username,
            'email'       => $this->email,
            'aktivan'     => (bool) $this->aktivan,
        ];
    }
}