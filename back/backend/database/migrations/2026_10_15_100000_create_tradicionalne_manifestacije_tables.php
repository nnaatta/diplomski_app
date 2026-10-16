<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tradicionalne_manifestacije', function (Blueprint $table) {
            $table->id();
            $table->string('naslov');
            $table->string('naslov_en')->nullable();
            $table->text('opis')->nullable();
            $table->text('opis_en')->nullable();
            $table->string('period', 100)->nullable();
            $table->string('period_en', 100)->nullable();
            $table->unsignedInteger('redoslijed')->default(0);
            $table->boolean('aktivan')->default(true);
            $table->timestamps();
        });

        // Pivot — isti oblik kao restoran_slike / smjestaj_slike
        Schema::create('tradicionalne_slike', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tradicionalna_id')->constrained('tradicionalne_manifestacije')->cascadeOnDelete();
            $table->foreignId('slika_id')->constrained('slike')->cascadeOnDelete();
            $table->boolean('glavna')->default(false);
            $table->boolean('aktivan')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tradicionalne_slike');
        Schema::dropIfExists('tradicionalne_manifestacije');
    }
};
