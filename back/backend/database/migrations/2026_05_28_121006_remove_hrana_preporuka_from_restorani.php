<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restorani', function (Blueprint $table) {
            $table->dropColumn('hrana_preporuka');
        });
    }

    public function down(): void
    {
        Schema::table('restorani', function (Blueprint $table) {
            $table->string('hrana_preporuka', 255)->nullable()->after('opis');
        });
    }
};