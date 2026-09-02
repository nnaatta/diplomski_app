<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slika extends Model
{

    protected $table = 'slike';
    
    protected $fillable = [
        'url',
        'alt_text',
        'opis',
        'aktivan',
    ];

    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function smjestaj_slike() {


         return $this->hasMany(smjestajSlike::class, 'slika_id');
        
        
    }
    public function restoran_slike() {


         return $this->hasMany(restoranSlike::class, 'slika_id');
        
        
    }
    public function blog_slike() {


         return $this->hasMany(blogSlike::class, 'slika_id');
        
        
    }

    public function turisticki_sadrzaji() {
        return $this->hasMany(Turisticki_sadrzaj::class);
    }


    public function dogadjaji() {
        return $this->hasMany(Dogadjaj::class);
    }
}