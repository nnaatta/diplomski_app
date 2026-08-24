<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('preporuke_hrane', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restoran_id')
                  ->constrained('restorani')
                  ->cascadeOnDelete();
            $table->string('naziv', 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('preporuke_hrane');
    }
};