<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kontakt_osoba extends Model
{
    protected $fillable = [

        'id',
        'ime',
        'prezime',
        'br_telefona',
        'uloga',
        'email',
        'instagram',
        'facebook',
        'web_stranica',

    ];

    public function smjestaji() {


         return $this->hasMany(Smjestaj::class, 'kontakt_osoba_id');
        
        
    }
    public function restorani() {


         return $this->hasMany(Restoran::class, 'kontakt_osoba_id');
        
        
    }
    public function dogadjaji() {


         return $this->hasMany(Dogadjaj::class, 'kontakt_osoba_id');
        
        
    }
}
