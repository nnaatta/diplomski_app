<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class blogSlike extends Model
{
    protected $fillable = [

        'id',
        'blog_id',
        'slika_id',
        'aktivan',
        'glavna'

        


    ];

    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function blog() {


         return $this->belongsTo(Blog_post::class, 'blog_id');
        
    }
    public function slika() {


         return $this->belongsTo(Slika::class, 'slika_id');
        
    }
}
