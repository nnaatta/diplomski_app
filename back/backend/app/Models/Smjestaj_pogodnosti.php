<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Smjestaj_pogodnosti extends Model
{

    protected $table = 'smjestaj_pogodnosti';
    
    protected $fillable = [

        'id',
        'smjestaj_id',
        'pogodnost_id'

    ];

    public function smjestaj() {


         return $this->belongsTo(Smjestaj::class, 'smjestaj_id');
        
    }
    public function pogodnost() {


         return $this->belongsTo(Pogodnosti::class, 'pogodnost_id');
        
    }

}
