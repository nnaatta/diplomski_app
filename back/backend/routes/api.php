<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TipSmjestajaController;
use App\Http\Controllers\TipSadrzajaController;
use App\Http\Controllers\DogadjajKategorijaController;
use App\Http\Controllers\BlogKategorijaController;
use App\Http\Controllers\GalerijaKategorijaController;
use App\Http\Controllers\TipPorukeController;
use App\Http\Controllers\PogodnostiController;
use App\Http\Controllers\LokacijaController;
use App\Http\Controllers\KontaktOsobaController;
use App\Http\Controllers\SmjestajController;
use App\Http\Controllers\RestoranController;
use App\Http\Controllers\TuristickiSadrzajController;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\GalerijaController;
use App\Http\Controllers\PorukaController;
use App\Http\Controllers\SlikaController;

/*
|--------------------------------------------------------------------------
| JAVNE RUTE — dostupne bez prijave
|--------------------------------------------------------------------------
*/

// autentifikacija
// throttle:6,1 = najviše 6 pokušaja prijave u minuti po IP adresi — sprječava brute-force pogađanje lozinke
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:6,1');

// kontakt forma — turisti šalju poruke bez prijave
// throttle:5,1 = najviše 5 poruka u minuti po IP adresi — sprječava spam/zatrpavanje mejla
Route::post('/poruke', [PorukaController::class, 'store'])->middleware('throttle:5,1');

// javni prikaz podataka — turisti pretražuju sadržaj
Route::get('/smjestaji', [SmjestajController::class, 'index']);
Route::get('/smjestaji/{id}', [SmjestajController::class, 'show']);

Route::get('/restorani', [RestoranController::class, 'index']);
Route::get('/restorani/{id}', [RestoranController::class, 'show']);

Route::get('/turisticki-sadrzaji', [TuristickiSadrzajController::class, 'index']);
Route::get('/turisticki-sadrzaji/{id}', [TuristickiSadrzajController::class, 'show']);

Route::get('/dogadjaji', [DogadjajController::class, 'index']);
Route::get('/dogadjaji/{id}', [DogadjajController::class, 'show']);

Route::get('/blog-postovi', [BlogPostController::class, 'index']);
Route::get('/blog-postovi/{id}', [BlogPostController::class, 'show']);

Route::get('/galerije', [GalerijaController::class, 'index']);
Route::get('/galerije/{id}', [GalerijaController::class, 'show']);

// javni šifarnici — potrebni za filtere na javnom dijelu sajta
Route::get('/tipovi-smjestaja', [TipSmjestajaController::class, 'index']);
Route::get('/tipovi-sadrzaja', [TipSadrzajaController::class, 'index']);
Route::get('/dogadjaj-kategorije', [DogadjajKategorijaController::class, 'index']);
Route::get('/blog-kategorije', [BlogKategorijaController::class, 'index']);
Route::get('/galerija-kategorije', [GalerijaKategorijaController::class, 'index']);
Route::get('/pogodnosti', [PogodnostiController::class, 'index']);

/*
|--------------------------------------------------------------------------
| ZAŠTIĆENE RUTE — samo admin, potrebna prijava
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // autentifikacija
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // šifarnici — puni CRUD samo za admina
    Route::apiResource('tipovi-smjestaja', TipSmjestajaController::class)->except(['index']);
    Route::apiResource('tipovi-sadrzaja', TipSadrzajaController::class)->except(['index']);
    Route::apiResource('dogadjaj-kategorije', DogadjajKategorijaController::class)->except(['index']);
    Route::apiResource('blog-kategorije', BlogKategorijaController::class)->except(['index']);
    Route::apiResource('galerija-kategorije', GalerijaKategorijaController::class)->except(['index']);
    Route::apiResource('tipovi-poruke', TipPorukeController::class);
    Route::apiResource('pogodnosti', PogodnostiController::class)->except(['index']);

    // lokacije i kontakt osobe
    Route::apiResource('lokacije', LokacijaController::class);
    Route::apiResource('kontakt-osobe', KontaktOsobaController::class);

    // smještaj — admin upravlja, GET je javan pa exclude show i index
    Route::post('/smjestaji', [SmjestajController::class, 'store']);
    Route::put('/smjestaji/{id}', [SmjestajController::class, 'update']);
    Route::patch('/smjestaji/{id}', [SmjestajController::class, 'update']);
    Route::delete('/smjestaji/{id}', [SmjestajController::class, 'destroy']);

    // restorani
    Route::post('/restorani', [RestoranController::class, 'store']);
    Route::put('/restorani/{id}', [RestoranController::class, 'update']);
    Route::patch('/restorani/{id}', [RestoranController::class, 'update']);
    Route::delete('/restorani/{id}', [RestoranController::class, 'destroy']);

    // turistički sadržaji
    Route::post('/turisticki-sadrzaji', [TuristickiSadrzajController::class, 'store']);
    Route::put('/turisticki-sadrzaji/{id}', [TuristickiSadrzajController::class, 'update']);
    Route::patch('/turisticki-sadrzaji/{id}', [TuristickiSadrzajController::class, 'update']);
    Route::delete('/turisticki-sadrzaji/{id}', [TuristickiSadrzajController::class, 'destroy']);

    // događaji
    Route::post('/dogadjaji', [DogadjajController::class, 'store']);
    Route::put('/dogadjaji/{id}', [DogadjajController::class, 'update']);
    Route::patch('/dogadjaji/{id}', [DogadjajController::class, 'update']);
    Route::delete('/dogadjaji/{id}', [DogadjajController::class, 'destroy']);

    // blog
    Route::post('/blog-postovi', [BlogPostController::class, 'store']);
    Route::put('/blog-postovi/{id}', [BlogPostController::class, 'update']);
    Route::patch('/blog-postovi/{id}', [BlogPostController::class, 'update']);
    Route::delete('/blog-postovi/{id}', [BlogPostController::class, 'destroy']);
    Route::patch('/blog-postovi/{id}/toggle', [BlogPostController::class, 'toggleAktivan']);

    // galerija
    Route::post('/galerije', [GalerijaController::class, 'store']);
    Route::put('/galerije/{id}', [GalerijaController::class, 'update']);
    Route::patch('/galerije/{id}', [GalerijaController::class, 'update']);
    Route::delete('/galerije/{id}', [GalerijaController::class, 'destroy']);

    // poruke — admin čita i upravlja, slanje je javno
    Route::get('/poruke', [PorukaController::class, 'index']);
    Route::get('/poruke/{id}', [PorukaController::class, 'show']);
    Route::patch('/poruke/{id}/status', [PorukaController::class, 'promijeniStatus']);
    Route::delete('/poruke/{id}', [PorukaController::class, 'destroy']);

    // slike — upload i upravljanje
    Route::post('/slike/upload', [SlikaController::class, 'upload']);
    Route::patch('/slike/{id}/glavna', [SlikaController::class, 'postaviGlavnu']);
    Route::delete('/slike/{id}', [SlikaController::class, 'destroy']);
});