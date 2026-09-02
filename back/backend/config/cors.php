<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Bez ovog fajla, browser blokira sve zahtjeve koje frontend (React,
    | na jednom domenu) šalje ka backendu (Laravel, na drugom domenu) —
    | ovo je OBAVEZNO kad frontend i backend nisu na istom domenu, što je
    | slučaj u produkciji (npr. Vercel + Railway).
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Nabroj TAČNE domene sa kojih smije da se pristupa API-ju.
    // Nikad ne koristiti '*' (svi domeni) kad aplikacija ima login/tokene —
    // to bi omogućilo bilo kom sajtu na internetu da zove tvoj API.
    'allowed_origins' => array_filter(explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000'))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // true jer koristimo Bearer tokene kroz Authorization header
    'supports_credentials' => false,

];