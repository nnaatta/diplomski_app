<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class restoranSlike extends Model
{
    protected $fillable = [

        'id',
        'restoran_id',
        'slika_id',
        'aktivan',
        'glavna'

        


    ];

    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function restoran() {


         return $this->belongsTo(Restoran::class, 'restoran_id');
        
    }
    public function slika() {


         return $this->belongsTo(Slika::class, 'slika_id');
        
    }
}
