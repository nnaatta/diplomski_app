<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Postavke extends Model
{
    protected $fillable = [

        'id',
        'naziv',
        'vrijednost',


    ];
}
