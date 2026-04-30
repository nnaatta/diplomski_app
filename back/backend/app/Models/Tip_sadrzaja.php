<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tip_sadrzaja extends Model
{
    protected $fillable = [

        'id',
        'naziv'

    ];

    public function turisticki_sadrzaji() {


         return $this->hasMany(Turisticki_sadrzaj::class, 'tip_sadrzaja_id');
        
        
    }
}
