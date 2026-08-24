<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog_postovi', function (Blueprint $table) {
            $table->id();
            $table->string('naslov');
            $table->text('tekst');
            $table->boolean('aktivan')->default(false);
            $table->foreignId('autor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('blog_kategorija_id')->nullable()->constrained('blog_kategorije')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_postovi');
    }
};
