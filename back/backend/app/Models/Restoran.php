<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restoran extends Model
{
    protected $fillable = [

        'id',
        'naziv',
        'opis',
        'hrana_preporuka',
        'radno_vrijeme',
        'aktivan',
        'lokacija_id',
        'kontakt_osoba_id',


    ];
    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function lokacija() {


        return $this->belongsTo(Lokacija::class, 'lokacija_id');
        
        
    }

    public function kontakt_osoba() {


         return $this->belongsTo(Kontakt_osoba::class, 'kontakt_osoba_id');
        
        
    }

     public function restoran_pogodnosti() {


         return $this->hasMany(Restoran_pogodnosti::class, 'restoran_id');
        
        
    }
    public function pogodnosti() {
    return $this->belongsToMany(
        Pogodnosti::class,      
        'restoran_pogodnosti',  
        'restoran_id',          
        'pogodnost_id'          
    );
}

    public function restoran_slike() {


         return $this->hasMany(restoranSlike::class, 'restoran_id');
        
        
    }

}
