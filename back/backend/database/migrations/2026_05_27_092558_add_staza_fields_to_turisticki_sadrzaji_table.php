<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('turisticki_sadrzaji', function (Blueprint $table) {
            // Dužina staze u kilometrima (null = nije staza)
            $table->decimal('duzina_staze', 6, 2)->nullable()->after('opis');
            // Težina staze: laka / srednja / teska
            $table->enum('tezina', ['laka', 'srednja', 'teska'])->nullable()->after('duzina_staze');
        });
    }

    public function down(): void
    {
        Schema::table('turisticki_sadrzaji', function (Blueprint $table) {
            $table->dropColumn(['duzina_staze', 'tezina']);
        });
    }
};