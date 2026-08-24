<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class smjestajSlike extends Model
{

    protected $table = 'smjestaj_slike';
    
    protected $fillable = [

        'id',
        'smjestaj_id',
        'slika_id',
        'aktivan',
        'glavna'

        


    ];

    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function smjestaj() {


         return $this->belongsTo(Smjestaj::class, 'smjestaj_id');
        
    }
    public function slika() {


         return $this->belongsTo(Slika::class, 'slika_id');
        
    }
}
