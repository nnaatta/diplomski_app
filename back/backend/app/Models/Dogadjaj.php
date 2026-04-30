<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
     protected $fillable = [

        'id',
        'naslov',
        'opis',
        'datum_od',
        'datum_do',
        'slika',
        'vrijeme',
        'aktivan',
        'lokacija_id',
        'kategorija_id',
        'kontakt_osoba_id',


    ];
    protected $casts = [
        'aktivan' => 'boolean',
        'datum_od' => 'date',
        'datum_do' => 'date',
        'vrijeme' => 'timestamp'

    ];

    public function lokacija() {


         return $this->belongsTo(Lokacija::class, 'lokacija_id');
        
        
    }
     public function kategorija() {


         return $this->belongsTo(Dogadjaj_kategorija::class, 'kategorija_id');
        
        
    }
    public function kontakt_osoba() {


         return $this->belongsTo(Kontakt_osoba::class, 'kontakt_osoba_id');
        
        
    }
}
