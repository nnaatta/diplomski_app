<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tip_smjestaja extends Model
{

    protected $table = 'tipovi_smjestaja';

    protected $fillable = [

        'id',
        'naziv'

    ];

    public function smjestaji() {


         return $this->hasMany(Smjestaj::class, 'tip_smjestaja_id');
        
        
    }
}
