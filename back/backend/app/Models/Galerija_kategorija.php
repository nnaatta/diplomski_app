<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galerija_kategorija extends Model
{
    protected $fillable = [

        'id',
        'naziv'

    ];

    public function galerije() {


         return $this->hasMany(Galerija::class, 'kategorija_id');
        
        
    }
}
