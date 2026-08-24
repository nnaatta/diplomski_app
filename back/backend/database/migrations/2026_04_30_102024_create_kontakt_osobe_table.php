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
        Schema::create('kontakt_osobe', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('prezime');
            $table->string('br_telefona');
            $table->string('uloga') -> nullable();
            $table->string('email') -> nullable();
            $table->string('instagram') -> nullable();
            $table->string('facebook') -> nullable();
            $table->string('web_stranica') -> nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontakt_osobe');
    }
};
