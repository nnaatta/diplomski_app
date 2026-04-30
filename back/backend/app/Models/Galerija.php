<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galerija extends Model
{
    protected $fillable = [

        'id',
        'naslov',
        'slika',
        'aktivan',
        'kategorija_id',
        


    ];
    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function kategorija() {


         return $this->belongsTo(Galerija_kategorija::class, 'kategorija_id');
        
        
    }
}
