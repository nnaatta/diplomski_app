<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog_post extends Model
{
    protected $fillable = [

        'id',
        'naslov',
        'tekst',
        'aktivan',
        'autor_id',
        'blog_kategorija_id',
        


    ];
    protected $casts = [
        'aktivan' => 'boolean'
    ];

    public function autor() {


         return $this->belongsTo(User::class, 'autor_id');
        
        
    }
     public function kategorija() {


         return $this->belongsTo(Blog_kategorija::class, 'blog_kategorija_id');
        
        
    }
    public function blog_slike() {


         return $this->hasMany(blogSlike::class, 'blog_id');
        
        
    }

}
