<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tip_poruke extends Model
{


    protected $table = 'tipovi_poruke';

    protected $fillable = [

        'id',
        'naziv'

    ];

    public function poruke() {


         return $this->hasMany(Poruka::class, 'tip_poruke_id');
        
        
    }

}
