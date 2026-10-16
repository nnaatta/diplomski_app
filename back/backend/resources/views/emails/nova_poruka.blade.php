Nova poruka sa web sajta

Od: {!! $poruka->ime !!} {!! $poruka->prezime !!}
Email: {!! $poruka->email !!}
Telefon: {!! $poruka->br_tel ?: '—' !!}
Tip upita: {!! $poruka->tip_poruke?->naziv ?? '—' !!}
Datum: {!! $poruka->datum?->format('d.m.Y') !!}

Naslov: {!! $poruka->naslov !!}

{!! $poruka->tekst !!}

--
Na ovu poruku možete odgovoriti direktno — odgovor ide na adresu pošiljaoca.
