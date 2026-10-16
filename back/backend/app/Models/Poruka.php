<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poruka extends Model
{

    protected $table = 'poruke';
    
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
        'email_poslan_at',
        'email_greska',
        'tip_poruke_id',
       


    ];
    protected $casts = [
        
        'datum' => 'date',
        'email_poslan_at' => 'datetime',
    ];

    public function tip_poruke() {


         return $this->belongsTo(Tip_poruke::class, 'tip_poruke_id');
        
        
    }
}