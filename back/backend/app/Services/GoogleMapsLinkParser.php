<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Iz linka kopiranog sa Google Maps izvlači koordinate (lat, lng).
 *
 * Podržano:
 *  - običan link iz adresne trake  (https://www.google.com/maps/place/.../@44.08,18.94,17z/data=...)
 *  - skraćeni link sa dugmeta "Dijeli" (https://maps.app.goo.gl/xxxx) — prati se redirekt
 *  - cijeli embed kod ("Dijeli → Ugradi mapu", <iframe src="...">)
 *
 * Koordinate se čuvaju u postojećim kolonama lat/lng, ali ih admin više ne unosi ručno.
 */
class GoogleMapsLinkParser
{
    private const SKRACENI_HOSTOVI = ['maps.app.goo.gl', 'goo.gl', 'g.co'];
    private const MAX_REDIREKTA    = 5;

    /** @return array{lat: float, lng: float}|null */
    public function parse(string $unos): ?array
    {
        $url = $this->izvuciUrl($unos);
        if (!$url) {
            return null;
        }

        $host = parse_url($url, PHP_URL_HOST);
        if (!$host || !$this->jeDozvoljenHost($host)) {
            return null;
        }

        if ($this->jeSkraceniHost($host)) {
            $url = $this->razrijesiSkraceni($url);
            if (!$url) {
                return null;
            }
        }

        return self::izvuciKoordinate($url);
    }

    /** Iz zalijepljenog teksta (link ili <iframe>) vraća prvi URL. */
    public function izvuciUrl(string $unos): ?string
    {
        $unos = trim($unos);

        if (preg_match('/src\s*=\s*"([^"]+)"/i', $unos, $m)) {
            $unos = html_entity_decode($m[1]);
        }

        if (preg_match('~https?://[^\s"\'<>]+~i', $unos, $m)) {
            return $m[0];
        }

        return null;
    }

    /** Čista funkcija (bez HTTP-a): traži koordinate unutar URL-a. */
    public static function izvuciKoordinate(string $url): ?array
    {
        $u = urldecode($url);
        $num = '(-?\d{1,3}\.\d+)';

        $obrasci = [
            // tačka (pin) mjesta u "data" dijelu linka: !3d{lat}!4d{lng}
            ["/!3d{$num}!4d{$num}/", 'lat-lng'],
            // ?q=lat,lng  ?query=lat,lng  ?ll=lat,lng
            ["/[?&](?:q|query|ll|destination)={$num},\s*\+?{$num}/", 'lat-lng'],
            // /maps/place/lat,lng  ili  /maps/search/lat,lng
            ["~/maps/(?:place|search)/{$num},\s*\+?{$num}~", 'lat-lng'],
            // embed link: !2d{lng}!3d{lat}
            ["/!2d{$num}!3d{$num}/", 'lng-lat'],
            // centar mape: @lat,lng,zoom
            ["/@{$num},{$num}/", 'lat-lng'],
        ];

        foreach ($obrasci as [$regex, $redoslijed]) {
            if (preg_match($regex, $u, $m)) {
                $lat = (float) ($redoslijed === 'lat-lng' ? $m[1] : $m[2]);
                $lng = (float) ($redoslijed === 'lat-lng' ? $m[2] : $m[1]);

                if ($lat >= -90 && $lat <= 90 && $lng >= -180 && $lng <= 180) {
                    return ['lat' => $lat, 'lng' => $lng];
                }
            }
        }

        return null;
    }

    private function razrijesiSkraceni(string $url): ?string
    {
        for ($i = 0; $i < self::MAX_REDIREKTA; $i++) {
            $host = parse_url($url, PHP_URL_HOST);

            // zaštita: prati se samo Google domene
            if (!$host || !$this->jeDozvoljenHost($host)) {
                return null;
            }

            // consent stranica nosi pravi link u parametru "continue"
            parse_str((string) parse_url($url, PHP_URL_QUERY), $query);
            if (!empty($query['continue'])) {
                $url = $query['continue'];
                continue;
            }

            if (!$this->jeSkraceniHost($host)) {
                return $url; // stigli do dugog Google Maps linka
            }

            try {
                $odgovor = Http::timeout(8)
                    ->withoutRedirecting()
                    ->withHeaders(['User-Agent' => 'Mozilla/5.0 (compatible; TOHanPijesak/1.0)'])
                    ->get($url);
            } catch (\Throwable $e) {
                Log::warning('Google Maps skraćeni link nije razriješen: ' . $e->getMessage());
                return null;
            }

            $lokacija = $odgovor->header('Location');
            if (!$lokacija) {
                return null;
            }

            $url = str_starts_with($lokacija, '/')
                ? 'https://' . $host . $lokacija
                : $lokacija;
        }

        return null;
    }

    private function jeSkraceniHost(string $host): bool
    {
        return in_array(strtolower($host), self::SKRACENI_HOSTOVI, true);
    }

    private function jeDozvoljenHost(string $host): bool
    {
        $host = strtolower($host);

        return $this->jeSkraceniHost($host)
            || (bool) preg_match('/(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/', $host);
    }
}