<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TradicionalnaManifestacija extends Model
{
    protected $table = 'tradicionalne_manifestacije';

    protected $fillable = [
        'naslov', 'opis', 'period', 'redoslijed', 'aktivan',
    ];

    protected $casts = [
        'aktivan'    => 'boolean',
        'redoslijed' => 'integer',
    ];

    // BelongsToMany — pivot tradicionalne_slike ima glavna i aktivan
    public function slike(): BelongsToMany
    {
        return $this->belongsToMany(Slika::class, 'tradicionalne_slike', 'tradicionalna_id', 'slika_id')
                    ->withPivot('glavna', 'aktivan')
                    ->withTimestamps()
                    ->orderByPivot('glavna', 'desc')
                    ->orderByPivot('id');
    }
}
