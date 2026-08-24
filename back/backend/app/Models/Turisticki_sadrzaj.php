<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turisticki_sadrzaj extends Model
{
    protected $table = 'turisticki_sadrzaji';

    protected $fillable = [
        'naslov', 'opis', 'aktivan',
        'lokacija_id', 'tip_sadrzaja_id',
        'slika_id',
        'duzina_staze',  // dodato migracijom
        'tezina',        // dodato migracijom
    ];

    protected $casts = [
        'aktivan'      => 'boolean',
        'duzina_staze' => 'decimal:2',
    ];

    public function lokacija() {
        return $this->belongsTo(Lokacija::class, 'lokacija_id');
    }

    public function tip_sadrzaja() {
        return $this->belongsTo(Tip_sadrzaja::class, 'tip_sadrzaja_id');
    }

    public function slika() {
        return $this->belongsTo(Slika::class, 'slika_id');
    }
}