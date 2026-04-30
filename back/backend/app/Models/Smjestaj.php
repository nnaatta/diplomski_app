<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Smjestaj extends Model
{
    protected $fillable = [

        'id',
        'naziv',
        'opis',
        'br_soba',
        'br_lezajeva',
        'aktivan',
        'lokacija_id',
        'tip_smjestaja_id',
        'kontakt_osoba_id',


    ];
    protected $casts = [
        'aktivan' => 'boolean'
    ];

     public function lokacija() {


         return $this->belongsTo(Lokacija::class, 'lokacija_id');
        
        
    }
     public function tip_smjestaja() {


         return $this->belongsTo(Tip_smjestaja::class, 'tip_smjestaja_id');
        
        
    }
    public function kontakt_osoba() {


         return $this->belongsTo(Kontakt_osoba::class, 'kontakt_osoba_id');
        
        
    }
    public function smjestaj_pogodnosti() {


         return $this->hasMany(Smjestaj_pogodnosti::class, 'smjestaj_id');
        
        
    }
    public function pogodnosti() {
    return $this->belongsToMany(
        Pogodnosti::class,      
        'smjestaj_pogodnosti', 
        'smjestaj_id',          
        'pogodnost_id'         
    );
    
}

public function smjestaj_slike() {


         return $this->hasMany(smjestajSlike::class, 'smjestaj_id');
        
        
    }


}
