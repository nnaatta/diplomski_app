<?php

namespace App\Http\Controllers;

use App\Models\Smjestaj;
use App\Models\Turisticki_sadrzaj;
use App\Models\Blog_post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generiše XML sitemap za sve dinamičke stranice (smještaj, staze, blog),
     * na osnovu trenutno aktivnih zapisa u bazi.
     *
     * Frontend domen se čita iz .env fajla (FRONTEND_URL), da ne bude
     * hardkodovan i da se lako promijeni kad se zna pravi domen.
     */
    public function dinamicki()
    {
        $frontendUrl = rtrim(env('FRONTEND_URL', 'https://hanpijesak-turizam.rs'), '/');

        $urls = [];

        // Smještaj — samo aktivni oglasi
        Smjestaj::where('aktivan', true)
            ->select('id', 'updated_at')
            ->get()
            ->each(function ($s) use (&$urls, $frontendUrl) {
                $urls[] = [
                    'loc' => "{$frontendUrl}/smjestaj/{$s->id}",
                    'lastmod' => $s->updated_at?->format('Y-m-d'),
                    'changefreq' => 'weekly',
                    'priority' => '0.7',
                ];
            });

        // Staze (aktivni odmor) — samo aktivni sadržaji
        Turisticki_sadrzaj::where('aktivan', true)
            ->select('id', 'updated_at')
            ->get()
            ->each(function ($t) use (&$urls, $frontendUrl) {
                $urls[] = [
                    'loc' => "{$frontendUrl}/aktivni-odmor/{$t->id}",
                    'lastmod' => $t->updated_at?->format('Y-m-d'),
                    'changefreq' => 'monthly',
                    'priority' => '0.6',
                ];
            });

        // Blog postovi — samo aktivni (objavljeni)
        Blog_post::where('aktivan', true)
            ->select('id', 'updated_at')
            ->get()
            ->each(function ($b) use (&$urls, $frontendUrl) {
                $urls[] = [
                    'loc' => "{$frontendUrl}/blog/{$b->id}",
                    'lastmod' => $b->updated_at?->format('Y-m-d'),
                    'changefreq' => 'monthly',
                    'priority' => '0.6',
                ];
            });

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($urls as $u) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars($u['loc']) . "</loc>\n";
            if ($u['lastmod']) {
                $xml .= "    <lastmod>{$u['lastmod']}</lastmod>\n";
            }
            $xml .= "    <changefreq>{$u['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$u['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
