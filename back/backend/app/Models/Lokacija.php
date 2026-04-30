<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lokacija extends Model
{
    protected $fillable = [

        'id',
        'naziv',
        'adresa',
        'lat',
        'lng',
        'aktivan',


    ];

    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function turisticki_sadrzaji() {


         return $this->hasMany(Turisticki_sadrzaj::class, 'lokacija_id');
        
        
    }
    public function smjestaji() {


         return $this->hasMany(Smjestaj::class, 'lokacija_id');
        
        
    }
    public function restorani() {


         return $this->hasMany(Restoran::class, 'lokacija_id');
        
        
    }
    public function dogadjaji() {


         return $this->hasMany(Dogadjaj::class, 'lokacija_id');
        
        
    }
    

}
