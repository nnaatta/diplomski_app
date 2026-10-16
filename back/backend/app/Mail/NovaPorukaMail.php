<?php

namespace App\Mail;

use App\Models\Poruka;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * Obavještenje turističkoj organizaciji o novoj poruci sa kontakt forme.
 * Reply-To je adresa posjetioca, pa se odgovor šalje direktno njemu.
 */
class NovaPorukaMail extends Mailable
{
    public function __construct(public Poruka $poruka)
    {
    }

    public function envelope(): Envelope
    {
        $naslov = trim(preg_replace('/\s+/', ' ', (string) $this->poruka->naslov));
        $imePrezime = trim("{$this->poruka->ime} {$this->poruka->prezime}");

        return new Envelope(
            subject: "Nova poruka: {$naslov}",
            replyTo: [new Address($this->poruka->email, $imePrezime)],
        );
    }

    public function content(): Content
    {
        return new Content(text: 'emails.nova_poruka');
    }
}
