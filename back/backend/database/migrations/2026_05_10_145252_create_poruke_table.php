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
        Schema::create('poruke', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('prezime');
            $table->string('email');
            $table->string('br_tel')->nullable();
            $table->string('naslov');
            $table->text('tekst');
            $table->date('datum');
            $table->string('status')->default('novo');
            $table->foreignId('tip_poruke_id')->nullable()->constrained('tipovi_poruke')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poruke');
    }
};
