<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('poruke', function (Blueprint $table) {
            // kad je email obavještenje uspješno poslano (null = nije poslano)
            $table->timestamp('email_poslan_at')->nullable()->after('status');
            // poruka o grešci ako slanje nije uspjelo
            $table->string('email_greska', 500)->nullable()->after('email_poslan_at');
        });
    }

    public function down(): void
    {
        Schema::table('poruke', function (Blueprint $table) {
            $table->dropColumn(['email_poslan_at', 'email_greska']);
        });
    }
};
