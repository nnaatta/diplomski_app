<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('smjestaji', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
            $table->text('opis_en')->nullable()->after('opis');
        });

        Schema::table('restorani', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
            $table->text('opis_en')->nullable()->after('opis');
        });

        Schema::table('turisticki_sadrzaji', function (Blueprint $table) {
            $table->string('naslov_en')->nullable()->after('naslov');
            $table->text('opis_en')->nullable()->after('opis');
        });

        Schema::table('dogadjaji', function (Blueprint $table) {
            $table->string('naslov_en')->nullable()->after('naslov');
            $table->text('opis_en')->nullable()->after('opis');
        });

        Schema::table('blog_postovi', function (Blueprint $table) {
            $table->string('naslov_en')->nullable()->after('naslov');
            $table->text('tekst_en')->nullable()->after('tekst');
        });

        Schema::table('galerija', function (Blueprint $table) {
            $table->string('naslov_en')->nullable()->after('naslov');
        });

        Schema::table('blog_kategorije', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });

        Schema::table('dogadjaj_kategorije', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });

        Schema::table('galerija_kategorije', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });

        Schema::table('tipovi_smjestaja', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });

        Schema::table('tipovi_sadrzaja', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });

        Schema::table('pogodnosti', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });

        Schema::table('preporuke_hrane', function (Blueprint $table) {
            $table->string('naziv_en')->nullable()->after('naziv');
        });
    }

    public function down(): void
    {
        Schema::table('smjestaji', function (Blueprint $table) {
            $table->dropColumn(['naziv_en', 'opis_en']);
        });
        Schema::table('restorani', function (Blueprint $table) {
            $table->dropColumn(['naziv_en', 'opis_en']);
        });
        Schema::table('turisticki_sadrzaji', function (Blueprint $table) {
            $table->dropColumn(['naslov_en', 'opis_en']);
        });
        Schema::table('dogadjaji', function (Blueprint $table) {
            $table->dropColumn(['naslov_en', 'opis_en']);
        });
        Schema::table('blog_postovi', function (Blueprint $table) {
            $table->dropColumn(['naslov_en', 'tekst_en']);
        });
        Schema::table('galerija', function (Blueprint $table) {
            $table->dropColumn('naslov_en');
        });
        Schema::table('blog_kategorije', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
        Schema::table('dogadjaj_kategorije', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
        Schema::table('galerija_kategorije', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
        Schema::table('tipovi_smjestaja', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
        Schema::table('tipovi_sadrzaja', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
        Schema::table('pogodnosti', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
        Schema::table('preporuke_hrane', function (Blueprint $table) {
            $table->dropColumn('naziv_en');
        });
    }
};