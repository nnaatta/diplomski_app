<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PreporukaHrane extends Model
{
    protected $table = 'preporuke_hrane';

    protected $fillable = ['restoran_id', 'naziv'];

    public function restoran(): BelongsTo
    {
        return $this->belongsTo(Restoran::class);
    }
}