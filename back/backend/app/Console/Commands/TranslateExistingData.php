<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\TranslationService;
use App\Models\Smjestaj;
use App\Models\Restoran;
use App\Models\Turisticki_sadrzaj;
use App\Models\Dogadjaj;
use App\Models\Blog_post;
use App\Models\Galerija;
use App\Models\Blog_kategorija;
use App\Models\Dogadjaj_kategorija;
use App\Models\Galerija_kategorija;
use App\Models\Tip_smjestaja;
use App\Models\Tip_sadrzaja;
use App\Models\Pogodnosti;
use App\Models\PreporukaHrane;

class TranslateExistingData extends Command
{
    protected $signature = 'app:translate-existing-data';
    protected $description = 'Prevodi postojeće podatke u bazi na engleski (_en kolone)';

    public function handle()
    {
        $translator = new TranslationService();

        // --- Smjestaji ---
        $this->info('Prevodim smjestaje...');
        foreach (Smjestaj::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            if (empty($item->opis_en) && !empty($item->opis)) {
                $item->opis_en = $translator->translate($item->opis);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Restorani ---
        $this->info('Prevodim restorane...');
        foreach (Restoran::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            if (empty($item->opis_en) && !empty($item->opis)) {
                $item->opis_en = $translator->translate($item->opis);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Turisticki sadrzaji ---
        $this->info('Prevodim turisticke sadrzaje...');
        foreach (Turisticki_sadrzaj::all() as $item) {
            if (empty($item->naslov_en)) {
                $item->naslov_en = $translator->translate($item->naslov);
            }
            if (empty($item->opis_en) && !empty($item->opis)) {
                $item->opis_en = $translator->translate($item->opis);
            }
            $item->save();
            $this->line("  - {$item->naslov}");
        }

        // --- Dogadjaji ---
        $this->info('Prevodim dogadjaje...');
        foreach (Dogadjaj::all() as $item) {
            if (empty($item->naslov_en)) {
                $item->naslov_en = $translator->translate($item->naslov);
            }
            if (empty($item->opis_en) && !empty($item->opis)) {
                $item->opis_en = $translator->translate($item->opis);
            }
            $item->save();
            $this->line("  - {$item->naslov}");
        }

        // --- Blog postovi ---
        $this->info('Prevodim blog postove...');
        foreach (Blog_post::all() as $item) {
            if (empty($item->naslov_en)) {
                $item->naslov_en = $translator->translate($item->naslov);
            }
            if (empty($item->tekst_en) && !empty($item->tekst)) {
                $item->tekst_en = $translator->translate($item->tekst);
            }
            $item->save();
            $this->line("  - {$item->naslov}");
        }

        // --- Galerija ---
        $this->info('Prevodim galeriju...');
        foreach (Galerija::all() as $item) {
            if (empty($item->naslov_en)) {
                $item->naslov_en = $translator->translate($item->naslov);
            }
            $item->save();
            $this->line("  - {$item->naslov}");
        }

        // --- Blog kategorije ---
        $this->info('Prevodim blog kategorije...');
        foreach (Blog_kategorija::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Dogadjaj kategorije ---
        $this->info('Prevodim dogadjaj kategorije...');
        foreach (Dogadjaj_kategorija::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Galerija kategorije ---
        $this->info('Prevodim galerija kategorije...');
        foreach (Galerija_kategorija::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Tipovi smjestaja ---
        $this->info('Prevodim tipove smjestaja...');
        foreach (Tip_smjestaja::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Tipovi sadrzaja ---
        $this->info('Prevodim tipove sadrzaja...');
        foreach (Tip_sadrzaja::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Pogodnosti ---
        $this->info('Prevodim pogodnosti...');
        foreach (Pogodnosti::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        // --- Preporuke hrane ---
        $this->info('Prevodim preporuke hrane...');
        foreach (PreporukaHrane::all() as $item) {
            if (empty($item->naziv_en)) {
                $item->naziv_en = $translator->translate($item->naziv);
            }
            $item->save();
            $this->line("  - {$item->naziv}");
        }

        $this->info('Готово! Svi podaci su prevedeni.');
        return 0;
    }
}