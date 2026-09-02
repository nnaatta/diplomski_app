<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * NAPOMENA: 'ime', 'prezime', 'username' i 'poslednji_login' se već
     * kreiraju u 0001_01_01_000000_create_users_table.php (ta migracija je
     * izmijenjena da odmah sadrži ove kolone umjesto Laravel-ovog
     * podrazumijevanog 'name'), pa ih ovdje ne diramo — samo dodajemo ono
     * što stvarno fali.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'aktivan')) {
                $table->boolean('aktivan')->default(true)->after('password');
            }
        });

        // username treba da bude jedinstven — dodaj unique indeks ako ga još nema
        $indexes = Schema::getIndexes('users');
        $imaUniqueUsername = collect($indexes)->contains(
            fn ($index) => in_array('username', $index['columns']) && $index['unique']
        );

        if (!$imaUniqueUsername) {
            Schema::table('users', function (Blueprint $table) {
                $table->unique('username');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['username']);
            $table->dropColumn('aktivan');
        });
    }
};