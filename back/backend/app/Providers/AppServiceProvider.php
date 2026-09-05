<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Railway (i slične platforme) grade NOV kontejner pri svakom deploy-u,
        // pa se "public/storage" veza (napravljena ručno preko "storage:link")
        // gubi svaki put. Ovdje je pravimo automatski, pri svakom pokretanju
        // aplikacije, ako već ne postoji — tako slike uvijek ostaju vidljive
        // bez ručne intervencije nakon svakog deploy-a.
        if (!file_exists(public_path('storage'))) {
            \Illuminate\Support\Facades\Artisan::call('storage:link', ['--force' => true]);
        }
    }
}