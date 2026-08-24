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
        Schema::table('turisticki_sadrzaji', function (Blueprint $table) {
             $table->foreignId('slika_id')->nullable()->constrained('slike')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('turisticki_sadrzaji', function (Blueprint $table) {
            $table->dropForeign(['slika_id']);
            $table->dropColumn('slika_id');
        });
    }
};
