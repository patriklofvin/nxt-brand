# @nxt/brand

NXT design-tokens, logotyper och typsnitt — **en central källa för hela
plattformen**. Källa till sanning: **NXT Brand Book v1.0 (2026)**.
Ändringar görs endast här, taggas, och bumpas i konsumerande repos.

## Installation

```bash
npm i github:patriklofvin/nxt-brand#v1.1.0
```

## Användning

```css
/* globals.css — importera i denna ordning */
@import '@nxt/brand/css/fonts.css';
@import '@nxt/brand/css/nxt-tokens.css';

:root {
  /* Sätt appens modulaccent (exempel: wise-assist) */
  --nxt-accent: var(--nxt-assist);
}
```

```js
// tailwind.config.ts
module.exports = {
  presets: [require('@nxt/brand/tailwind.preset')],
  // ...
};
```

```jsx
// Logotyp (exempel)
import logo from '@nxt/brand/logos/svg/nxt-assist-primary.svg';
```

## Accent per system

| System | Accent-variabel | Hex |
|---|---|---|
| ahrant-platform (nav) | `--nxt-learning` | `#7E5A96` |
| KL Studio | `--nxt-studio` | `#C25D86` |
| Compliance OS | `--nxt-compliance` | `#5C6FC0` |
| wise-assist | `--nxt-assist` | `#2F8E9C` |
| Testcenter (subtree i KL Studio) | `--nxt-test` | `#3F9466` |
| Lexicon (fristående läge) | `--nxt-lexicon` | `#B0822F` |
| Docs (leveranser) | `--nxt-docs` | `#6B6677` |

Accent-scoping för moduler: sätt `--nxt-accent` på modulens rot-element,
inte på `:root` — då blir Testcenter grönt inne i rosa Studio.

## Statuspalett (beslut 2026-07-10)

Semantiska statusfärger ur brand book-paletten. Status kommuniceras
**alltid** med färg **+ ikon + text** (WCAG 1.4.1 — aldrig enbart färg).

| Token | Hex | Tailwind | Användning |
|---|---|---|---|
| `--nxt-error` | `#C0392B` | `nxt.error` | Fel, destruktiva tillstånd |
| `--nxt-warning` | `#B0822F` | `nxt.warning` | Varning (= bärnsten) |
| `--nxt-success` | `#3F9466` | `nxt.success` | Lyckat (= grön) |
| `--nxt-info` | `#7E5A96` | `nxt.info` | Information (= violett) |

Generiska accent-tinter som följer aktiv `--nxt-accent` (för hover,
markerade rader, subtila fyllningar):

| Token | Definition | Tailwind |
|---|---|---|
| `--nxt-accent-50` | `color-mix(... 8%, white)` | `nxt.accent-50` |
| `--nxt-accent-100` | `color-mix(... 16%, white)` | `nxt.accent-100` |

## Ytregler (bindande — Brand Book §03/§06)

- **Neutrala ytor** (dokument, tabeller, arbetsytor): papper-bakgrund,
  mono-lockup (violett märke + svart namn).
- **Bärande ytor** (header, hero, sektionsband): modulfärg fyller ytan,
  **vit reverserad lockup**.
- NXT-märket färgas **aldrig** om i accentfärg, förvrängs eller roteras.
- Modulfärger = accenter, ikoner, tillstånd, diagram. Aldrig stora textytor.
- Minsta logotypstorlek digitalt: **24 px höjd**. Frizon: X-höjden.

## Kontrast (WCAG AA)

**Samtliga värden är uppmätta (WCAG 2.1 relativ luminans), inte hämtade ur brand
boken.** Mätningen gjordes i KL Studios CR-BRAND-2b-verifiering 2026-08-02 och
korrigerar flera rader — brand bokens angivna värden var i vissa fall för
generösa. Räknaren är validerad mot facit (vit/svart = 21,00; vit/`#777777` =
4,48; vit/`#767676` = 4,54).

AA-trösklar: **4,5:1** för normal text, **3,0:1** för stor text
(≥24 px, eller ≥18,66 px bold).

| Yta | Vit text | Som textfärg mot papper `#FAF7FB` | Vit text OK? |
|---|---|---|---|
| Violett `#7E5A96` | **5,54:1** | 5,21:1 | Ja |
| Skiffer `#6B6677` | **5,54:1** | 5,21:1 | Ja |
| Blå `#5C6FC0` | **4,68:1** | 4,40:1 | Ja (knappt — verifiera states) |
| Rosa `#C25D86` | **4,04:1** | 3,80:1 | **Nej** — endast stor text |
| Turkos `#2F8E9C` | **3,84:1** | 3,61:1 | **Nej** — endast stor text |
| Grön `#3F9466` | **3,72:1** | 3,50:1 | **Nej** — endast stor text |
| Bärnsten `#B0822F` | **3,45:1** | 3,25:1 | **Nej** — se regeln nedan |
| Bläck `#211B27` | — | **15,80:1** | (referens) |

### Ändrat i v1.1.2 (uppmätt)

| Yta | Tidigare angivet | Uppmätt | Konsekvens |
|---|---|---|---|
| Turkos `#2F8E9C` | 4,6:1 "Ja" | **3,84:1** | ⚠️ Underkänt för normal text — tidigare tabell sade tvärtom |
| Rosa `#C25D86` | ~4,5:1 "Precis" | **4,04:1** | ⚠️ Underkänt för normal text (bekräftar KL Studios egen mätning i CR-BRAND-2) |
| Bärnsten `#B0822F` | 3,6:1 | **3,45:1** | Underkänt även som *textfärg* mot papper (3,25) |
| Grön `#3F9466` | 3,9:1 | 3,72:1 | Oförändrad slutsats |
| Blå `#5C6FC0` | 4,4:1 | 4,68:1 | Klarar normal text (var understated) |
| Violett / Skiffer | 4,9 / 5,0 | 5,54 | Bättre än angivet |

### Regler som följer

- **Bärnsten fungerar inte som textfärg och bär inte vit text.** Varken vit text
  på bärnsten (3,45) eller bärnsten som textfärg mot papper (3,25) klarar AA.
  Mönstret för etiketter är därför **bläck-text + bärnsten som accent-punkt** —
  se LEXICON-modulmarkören i KL Studio (`LexiconModuleMarker.tsx`), som sätter
  modulnamnet i bläck och låter bärnstenen bäras av en punkt intill.
  *Bläck på bärnsten är däremot godkänt* (4,86:1) om ytan behöver vara bärnsten.
- **Bärnsten, grön, turkos och rosa underkänns alla för normal text i vitt.**
  Alla fyra ligger över 3,0:1 och klarar därmed stor text (≥24 px / ≥18,66 px
  bold), men under 4,5:1 — vit brödtext är alltså uteslutet på samtliga fyra.
- Behövs liten **vit** text på en modulfärgad yta: använd en **mörkare ton av
  samma token** (t.ex. `color-mix(in srgb, var(--nxt-accent) 82%, #000)`, jfr
  `--nxt-accent-strong` i KL Studio = `#9F4C6E`, 5,63:1). På rosa räcker inte
  bläck heller (4,16:1) — där är mörkare yta enda vägen.
- Status kommuniceras alltid färg **+ ikon + text** (WCAG 1.4.1), så en
  underkänd färgkontrast aldrig ensam bär informationen.

## Typsnitt

Sora 300/400/600/700 (rubriker, lockups, brödtext) och JetBrains Mono
400/500 (etiketter, metadata, kod). Self-hostade woff2, latin subset,
OFL-1.1 (licensfiler i `/fonts`). Typskala: 48 / 28 / 16 / 12 px.

## Logotypfiler

`logos/svg/` (24) och `logos/png/` (25, transparent 3×). Tre hanteringar
per produkt: `-primary` (ljus botten), `-reverse` (på modulfärgad yta),
`-black` (1-färg). Fristående märke: `nxt-mark-violet/white/black` +
`nxt-mark-violet-sig` (e-postsignatur, endast PNG).

## Versionering

Semver via git-taggar. Brand book-ändring ⇒ ny tagg ⇒ bumpa
`#vX.Y.Z` i konsumerande repos `package.json`. Ingen registry behövs.
