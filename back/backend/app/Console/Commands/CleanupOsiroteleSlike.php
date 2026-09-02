<?php

namespace App\Console\Commands;

use App\Http\Controllers\SlikaController;
use App\Models\Slika;
use Illuminate\Console\Command;

class CleanupOsiroteleSlike extends Command
{
    /**
     * Naziv i opis komande za "php artisan list".
     */
    protected $signature = 'slike:cleanup';

    protected $description = 'Briše slike (fajl + baza) koje više nisu povezane ni sa jednim smještajem, restoranom, blogom, galerijom, događajem ili turističkim sadržajem.';

    public function handle(): int
    {
        $sviIdovi = Slika::pluck('id');
        $obrisano = 0;

        foreach ($sviIdovi as $id) {
            $postojiPrije = Slika::whereKey($id)->exists();

            SlikaController::obrisiSlikuAkoOsirotjela($id);

            if ($postojiPrije && !Slika::whereKey($id)->exists()) {
                $obrisano++;
            }
        }

        $this->info("Gotovo. Obrisano osirotelih slika: {$obrisano}.");

        return self::SUCCESS;
    }
}