# CR-BRAND-0 — Centralt NXT-brandpaket (tokens + logotyper)

**Status:** Utkast
**Repo:** Nytt repo `nxt-brand` (patriklofvin)
**Beroenden:** Inga (blockerar CR-BRAND-1 t.o.m. CR-BRAND-6)
**Källa till sanning:** NXT Brand Book v1.0 (2026)

## Bakgrund

Brand Book v1.0 definierar ny primärfärg **NXT Violett `#7E5A96`**, som ersätter
både det tidigare dokumenterade `#825B94` och den felaktiga blå `#2563EB` i
wise-assist-ai. Designen ska implementeras i sex system (KL Studio, wise-assist,
Compliance OS, Lexicon, Testcenter, ahrant-platform) plus NXT Docs som
kombinationsleverans (Compliance OS + KL Studio). Beslut: **en central CSS för
alla** — ändringar görs på ett ställe och synkas ut.

## Omfattning

1. **Nytt repo `nxt-brand`** med struktur:

   ```
   nxt-brand/
   ├── package.json          # name: "@nxt/brand", version: 1.0.0
   ├── css/nxt-tokens.css    # design-tokens (se bilaga)
   ├── logos/svg/            # 24 SVG från brand book §08
   ├── logos/png/            # 25 PNG (inkl. mark-violet-sig)
   ├── fonts/                # Sora 300/400/600/700 + JetBrains Mono 400/500
   │                         # self-hosted via fontsource-export (woff2)
   └── README.md             # ytregler ur brand book §03/§06 i kortform
   ```

2. **Distribution:** npm-paket installerat direkt från GitHub (kräver ingen
   registry): `"@nxt/brand": "github:patriklofvin/nxt-brand#v1.0.0"`.
   Version pinnas med git-tagg. Konsumerande appar importerar
   `@nxt/brand/css/nxt-tokens.css` i sin globals och refererar logotyper via
   paketet (bundlas vid build — ingen runtime-CDN-beroende).

3. **Filnamnsfix:** `nxt-mark-violet sig.png` → `nxt-mark-violet-sig.png`
   (mellanslag i filnamn tillåts inte).

4. **Tailwind-bridge:** `tailwind.preset.js` i paketet som mappar tokens till
   Tailwind-theme (`colors.nxt.violet`, `colors.nxt.accent`, `fontFamily.sans`
   → Sora, `fontFamily.mono` → JetBrains Mono), så alla repos delar samma
   preset: `presets: [require('@nxt/brand/tailwind.preset')]`.

## Tokens (sammanfattning)

| Token | Värde | Anteckning |
|---|---|---|
| `--nxt-violet` | `#7E5A96` | Primär. Ersätter `#825B94` och `#2563EB` |
| `--nxt-ink` | `#211B27` | Brödtext |
| `--nxt-paper` | `#FAF7FB` | Ljus bakgrund |
| `--nxt-learning` | `#7E5A96` | Kärnplattform/LMS |
| `--nxt-studio` | `#C25D86` | KL Studio |
| `--nxt-compliance` | `#5C6FC0` | Compliance OS |
| `--nxt-assist` | `#2F8E9C` | wise-assist |
| `--nxt-test` | `#3F9466` | Testcenter |
| `--nxt-lexicon` | `#B0822F` | Lexicon |
| `--nxt-docs` | `#6B6677` | Docs (leverans-branding) |
| `--nxt-accent` | per app | Sätts i respektive apps root |

Typografi: Sora (rubriker/brödtext), JetBrains Mono (etiketter/metadata/kod).
Skala digitalt: display 48 / rubrik 28 / brödtext 16 / etikett 12 px.

## Ytregler (bindande, ur brand book)

- Mono-lockup (violett märke + svart namn) på neutrala ytor.
- Modulfärg som bärande yta (headers/hero/sektionsband) → vit reverserad lockup.
- NXT-märket färgas **aldrig** om i accentfärg. Förvrängs/roteras aldrig.
- Modulfärger endast som accenter, ikoner, tillstånd, diagram — aldrig stora
  textytor. WCAG AA (minst 4,5:1).
- Minsta storlek digitalt: 24 px höjd på märket.

## Definition of Done

- [x] Repo `nxt-brand` skapat med struktur enligt ovan, taggat `v1.0.0`
- [x] Alla 49 logotypfiler incheckade, filnamn utan mellanslag
- [x] `nxt-tokens.css` + `tailwind.preset.js` verifierade mot brand book v1.0
- [x] Fonts self-hostade som woff2, licens kontrollerad (Sora: OFL,
      JetBrains Mono: OFL — OK)
- [x] Testinstallation från GitHub-URL fungerar i minst ett konsumerande repo
- [ ] Manthan DoD-sign-off (Rule 8)
