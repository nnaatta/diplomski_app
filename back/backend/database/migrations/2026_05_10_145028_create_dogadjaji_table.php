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
        Schema::create('dogadjaji', function (Blueprint $table) {
            $table->id();
            $table->string('naslov');
            $table->text('opis')->nullable();
            $table->date('datum_od');
            $table->date('datum_do')->nullable();
            $table->time('vrijeme')->nullable();
            $table->boolean('aktivan')->default(true);
            $table->foreignId('lokacija_id')->nullable()->constrained('lokacije')->nullOnDelete();
            $table->foreignId('kategorija_id')->nullable()->constrained('dogadjaj_kategorije')->nullOnDelete();
            $table->foreignId('kontakt_osoba_id')->nullable()->constrained('kontakt_osobe')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dogadjaji');
    }
};
