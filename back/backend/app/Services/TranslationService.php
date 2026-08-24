<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    private const MAX_CHUNK = 450; // ispod 500 limita, sigurnosna margina

    public function translate(string $text, string $from = 'sr', string $to = 'en'): ?string
    {
        if (empty(trim($text))) {
            return null;
        }

        // Ako je tekst kratak, prevedi direktno
        if (mb_strlen($text) <= self::MAX_CHUNK) {
            return $this->translateChunk($text, $from, $to);
        }

        // Dugi tekst - podijeli na rečenice i grupiši u chunkove
        $chunks = $this->splitIntoChunks($text);
        $prevedeni = [];

        foreach ($chunks as $chunk) {
            $rezultat = $this->translateChunk($chunk, $from, $to);
            // Ako prevod chunka ne uspije, koristi original (bolje nego ništa)
            $prevedeni[] = $rezultat ?? $chunk;
        }

        return implode(' ', $prevedeni);
    }

    private function translateChunk(string $text, string $from, string $to): ?string
    {
        try {
            $response = Http::timeout(15)->get('https://api.mymemory.translated.net/get', [
                'q'        => $text,
                'langpair' => "{$from}|{$to}",
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $translated = $data['responseData']['translatedText'] ?? null;

                if ($translated && str_contains(strtoupper($translated), 'MYMEMORY WARNING')) {
                    Log::warning('MyMemory limit reached');
                    return null;
                }

                return $translated;
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Translation error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Podijeli tekst na rečenice, pa grupiši rečenice u chunkove
     * tako da svaki chunk bude ≤ MAX_CHUNK karaktera.
     */
    private function splitIntoChunks(string $text): array
    {
        // Podijeli na rečenice (po tačci, uzvičniku, upitniku, novom redu)
        $sentences = preg_split('/(?<=[.!?\n])\s+/u', $text, -1, PREG_SPLIT_NO_EMPTY);

        $chunks = [];
        $current = '';

        foreach ($sentences as $sentence) {
            // Ako je i sama rečenica duža od limita, podijeli je grubo na riječi
            if (mb_strlen($sentence) > self::MAX_CHUNK) {
                if ($current !== '') {
                    $chunks[] = trim($current);
                    $current = '';
                }
                $words = explode(' ', $sentence);
                $piece = '';
                foreach ($words as $word) {
                    if (mb_strlen($piece . ' ' . $word) > self::MAX_CHUNK) {
                        $chunks[] = trim($piece);
                        $piece = $word;
                    } else {
                        $piece = $piece === '' ? $word : $piece . ' ' . $word;
                    }
                }
                if ($piece !== '') {
                    $chunks[] = trim($piece);
                }
                continue;
            }

            // Provjeri da li trenutna rečenica staje u current chunk
            if (mb_strlen($current . ' ' . $sentence) > self::MAX_CHUNK) {
                $chunks[] = trim($current);
                $current = $sentence;
            } else {
                $current = $current === '' ? $sentence : $current . ' ' . $sentence;
            }
        }

        if ($current !== '') {
            $chunks[] = trim($current);
        }

        return $chunks;
    }

    public function translateFields(array $fields): array
    {
        $translated = [];
        foreach ($fields as $key => $value) {
            if (!empty($value)) {
                $translated[$key] = $this->translate($value) ?? $value;
            }
        }
        return $translated;
    }
}