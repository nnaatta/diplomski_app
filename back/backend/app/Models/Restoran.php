<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restoran extends Model
{
    protected $table = 'restorani';

    protected $fillable = [
        'naziv', 'opis', 'radno_vrijeme', 'aktivan',
        'lokacija_id', 'kontakt_osoba_id',
    ];

    protected $casts = [
        'aktivan' => 'boolean',
    ];

    // BelongsToMany — pivot restoran_slike ima glavna i aktivan
    public function slike(): BelongsToMany
    {
        return $this->belongsToMany(Slika::class, 'restoran_slike', 'restoran_id', 'slika_id')
                    ->withPivot('glavna', 'aktivan')
                    ->withTimestamps()
                    ->orderByPivot('glavna', 'desc');
    }

    // FIX: restoran_pogodnosti NEMA timestamps — ukloniti withTimestamps()
    public function pogodnosti(): BelongsToMany
    {
        return $this->belongsToMany(
            Pogodnosti::class,
            'restoran_pogodnosti',
            'restoran_id',
            'pogodnost_id'
        );
        // NE koristimo withTimestamps() jer tabela nema created_at/updated_at
    }

    public function preporukeHrane(): HasMany
    {
        return $this->hasMany(PreporukaHrane::class, 'restoran_id');
    }

    public function lokacija(): BelongsTo
    {
        return $this->belongsTo(Lokacija::class);
    }

    public function kontaktOsoba(): BelongsTo
    {
        return $this->belongsTo(Kontakt_osoba::class, 'kontakt_osoba_id');
    }
}