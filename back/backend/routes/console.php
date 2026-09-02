<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Jednom sedmično počisti slike koje više nisu povezane ni sa jednim
// entitetom, da baza i disk (posebno bitno na besplatnom hostingu sa
// ograničenim prostorom) ne rastu zauvijek.
// NAPOMENA: da bi ovo stvarno radilo na hostingu, server mora imati
// pokrenut Laravel scheduler (cron koji svaki minut zove
// "php artisan schedule:run") — objasniću kako se to podesi kad budemo
// birale platformu za deploy backenda.
Schedule::command('slike:cleanup')->weekly();