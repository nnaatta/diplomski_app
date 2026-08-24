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
        Schema::create('smjestaj_pogodnosti', function (Blueprint $table) {
            $table->id();
            $table->foreignId('smjestaj_id')->constrained('smjestaji')->cascadeOnDelete();
            $table->foreignId('pogodnost_id')->constrained('pogodnosti')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smjestaj_pogodnosti');
    }
};
