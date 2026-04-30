<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turisticki_sadrzaj extends Model
{
    protected $fillable = [

        'id',
        'naslov',
        'opis',
        'aktivan',
        'lokacija_id',
        'tip_sadrzaja_id'
        

    ];

    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function lokacija() {


         return $this->belongsTo(Lokacija::class, 'lokacija_id');
        
        
    }
     public function tip_sadrzaja() {


         return $this->belongsTo(Tip_sadrzaja::class, 'tip_sadrzaja_id');
        
        
    }
}
