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
        Schema::create('smjestaji', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->text('opis')->nullable();
            $table->integer('br_soba')->nullable();
            $table->integer('br_lezajeva')->nullable();
            $table->boolean('aktivan')->default(true);
            $table->foreignId('lokacija_id')->nullable()->constrained('lokacije')->nullOnDelete();
            $table->foreignId('tip_smjestaja_id')->nullable()->constrained('tipovi_smjestaja')->nullOnDelete();
            $table->foreignId('kontakt_osoba_id')->nullable()->constrained('kontakt_osobe')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smjestaji');
    }
};
