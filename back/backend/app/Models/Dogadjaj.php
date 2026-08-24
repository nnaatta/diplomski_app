<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    protected $table = 'dogadjaji';

    protected $fillable = [
        'naslov', 'opis', 'datum_od', 'datum_do',
        'vrijeme', 'aktivan',
        'lokacija_id', 'kategorija_id', 'kontakt_osoba_id',
        'slika_id',  // FK ka slike tabeli — NE 'slika' (string)
    ];

    protected $casts = [
        'aktivan'  => 'boolean',
        'datum_od' => 'date',
        'datum_do' => 'date',
        // 'vrijeme' cast kao timestamp je pogrešan za H:i format — bez casta
    ];

    public function lokacija() {
        return $this->belongsTo(Lokacija::class, 'lokacija_id');
    }

    public function kategorija() {
        return $this->belongsTo(Dogadjaj_kategorija::class, 'kategorija_id');
    }

    public function kontakt_osoba() {
        return $this->belongsTo(Kontakt_osoba::class, 'kontakt_osoba_id');
    }

    public function slika() {
        return $this->belongsTo(Slika::class, 'slika_id');
    }
}