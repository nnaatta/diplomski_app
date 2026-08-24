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
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
            
            $table->string('ime')->after('id');
            $table->string('prezime')->after('ime');
            $table->string('username')->unique()->after('prezime');
            $table->boolean('aktivan')->default(true)->after('password');
            $table->timestamp('poslednji_login')->nullable()->after('aktivan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['ime', 'prezime', 'username', 'aktivan', 'poslednji_login']);
            $table->string('name')->after('id');
        });
    }
};
