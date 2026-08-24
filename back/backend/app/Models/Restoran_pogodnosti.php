<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restoran_pogodnosti extends Model
{

    protected $table = 'restoran_pogodnosti';
    
    protected $fillable = [

        'id',
        'restoran_id',
        'pogodnost_id'

    ];

    public function restoran() {


         return $this->belongsTo(Restoran::class, 'restoran_id');
        
    }
    public function pogodnost() {


         return $this->belongsTo(Pogodnosti::class, 'pogodnost_id');
        
    }
}
