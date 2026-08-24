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
        Schema::create('restorani', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->text('opis')->nullable();
            $table->string('hrana_preporuka')->nullable();
            $table->string('radno_vrijeme')->nullable();
            $table->boolean('aktivan')->default(true);
            $table->foreignId('lokacija_id')->nullable()->constrained('lokacije')->nullOnDelete();
            $table->foreignId('kontakt_osoba_id')->nullable()->constrained('kontakt_osobe')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restorani');
    }
};
