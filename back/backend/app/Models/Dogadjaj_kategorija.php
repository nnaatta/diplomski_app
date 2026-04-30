<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dogadjaj_kategorija extends Model
{
    protected $fillable = [

        'id',
        'naziv'

    ];

    public function dogadjaji() {


         return $this->hasMany(Dogadjaj::class, 'kategorija_id');
        
        
    }
}
