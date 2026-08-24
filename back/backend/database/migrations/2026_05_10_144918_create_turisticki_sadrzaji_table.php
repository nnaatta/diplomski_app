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
        Schema::create('turisticki_sadrzaji', function (Blueprint $table) {
            $table->id();
            $table->string('naslov');
            $table->text('opis')->nullable();
            $table->boolean('aktivan')->default(true);
            $table->foreignId('lokacija_id')->nullable()->constrained('lokacije')->nullOnDelete();
            $table->foreignId('tip_sadrzaja_id')->nullable()->constrained('tipovi_sadrzaja')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turisticki_sadrzaji');
    }
};
