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
        Schema::create('restoran_pogodnosti', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restoran_id')->constrained('restorani')->cascadeOnDelete();
            $table->foreignId('pogodnost_id')->constrained('pogodnosti')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restoran_pogodnosti');
    }
};
