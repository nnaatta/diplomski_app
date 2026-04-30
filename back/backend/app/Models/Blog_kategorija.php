<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog_kategorija extends Model
{
    protected $fillable = [

        'id',
        'naziv'

    ];
    public function blogovi() {


         return $this->hasMany(Blog_post::class, 'blog_kategorija_id');
        
        
    }
}
