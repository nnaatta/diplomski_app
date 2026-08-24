<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pogodnosti extends Model
{
    protected $table = 'pogodnosti';

    protected $fillable = [

        'id',
        'naziv',
        'ikona',
        

    ];

    public function smjestaj_pogodnosti() {


         return $this->hasMany(Smjestaj_pogodnosti::class, 'pogodnosti_id');
        
        
    }
    public function restoran_pogodnosti() {


         return $this->hasMany(Restoran_pogodnosti::class, 'pogodnosti_id');
        
        
    }

}
