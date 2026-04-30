<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poruka extends Model
{
    protected $fillable = [

        'id',
        'ime',
        'prezime',
        'email',
        'br_tel',
        'naslov',
        'tekst',
        'datum',
        'status',
        'tip_poruke_id',
       


    ];
    protected $casts = [
        
        'datum' => 'date',
    ];

    public function tip_poruke() {


         return $this->belongsTo(Tip_poruke::class, 'tip_poruke_id');
        
        
    }
}
