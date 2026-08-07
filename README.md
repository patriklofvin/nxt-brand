# @nxt/brand

NXT design-tokens, logotyper och typsnitt — **en central källa för hela
plattformen**. Ursprung: **NXT Brand Book v1.0 (2026)**. Detta paket är
**operativ källa till sanning** och superseder boken där uppmätta värden avviker
— se §Versionering. Ändringar görs endast här, taggas, och bumpas i
konsumerande repos.

## Installation

```bash
npm i github:patriklofvin/nxt-brand#v1.3.1
```

## Användning

```css
/* globals.css — importera i denna ordning */
@import '@nxt/brand/css/fonts.css';
@import '@nxt/brand/css/nxt-tokens.css';

:root {
  /* Sätt appens modulaccent (exempel: wise-assist) */
  --nxt-accent:        var(--nxt-assist);
  --nxt-accent-strong: var(--nxt-assist-strong);
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

Accent-scoping för moduler: sätt `--nxt-accent` (och `--nxt-accent-strong`)
på modulens rot-element, inte på `:root` — då blir Testcenter grönt inne i
rosa Studio.

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

## Neutralskala (v1.3.0)

Brand book v1.0 har bläck och papper men inget däremellan, vilket ledde till att
varje konsument uppfann sin egen gråskala. Två tokens täpper till glappet. Båda
härleds ur bläck + papper, så de följer med om baspaletten ändras.

| Token | Beräknat värde | Mot papper `#FAF7FB` | Användning | Tailwind |
|---|---|---|---|---|
| `--nxt-ink-soft` | `#736F78` | **4,62:1** ✓ | Sekundärtext, lede, bildtexter | `nxt.ink-soft` |
| `--nxt-line` | `#DCD8DD` | 1,33:1 | Avdelare, ramar — **aldrig text** | `nxt.line` |

**Regel: `--nxt-ink-soft` är golvet för sekundärtext.** 62 % är valt för att det är
den lägsta andelen bläck som klarar AA — 60 % ger 4,35:1 och underkänns. Sänk
den inte lokalt.

**`--nxt-line` bär ingen information.** 1,33:1 klarar inte 3:1 (WCAG 1.4.11), så
en ram i den färgen får aldrig vara det enda som identifierar en komponent eller
dess tillstånd. Behöver kanten bära betydelse (fokus, valt tillstånd, fel):
komplettera med bakgrund, ikon eller etikett, eller använd accent/status-färg.

## Koncernlockup (v1.3.0)

`nxt-full-primary` (violett märke + "NXT" i bläck), `nxt-full-reverse` (helvit)
och `nxt-full-black` (1-färg). Används där **NXT som helhet** avsändare — nav,
plattformschrome, sidfötter, dokumentomslag — medan produktlockups används när
en specifik produkt refereras.

Samma geometri som produktlockuparna: viewBox-höjd 156, märket i `translate(18,18)`,
avdelare på x=346, text från x=376 i Sora. Frizonen är 18 enheter, mätt ur de
befintliga produktlockuparna (spridning 0,8 enheter över alla sju).

Två avvikelser mot produktlockuparna, båda avsiktliga:

- Namnet sätts i **Sora 700**, inte 600 — koncernnamnet är kortare och tål den
  tyngre graden.
- `nxt-full-reverse` har **ingen inbakad bakgrundsyta**. Produktlockuparnas
  reverse-filer bakar in sin egen modulfärg, vilket fungerar när lockup och yta
  hör ihop. Koncernlockupen läggs på vilken bärande yta som helst — violett,
  vilken modulfärg som helst, foto — så en inbakad yta hade varit fel i de
  flesta fall. Ytan sätts av konsumenten.

## Strong-varianter (v1.2.0) — för liten vit text

Fyra modulfärger bär inte liten vit text (se kontrasttabellen nedan). Varje
sådan modul har därför en **strong-variant**: grundtonen mörkad med bevarad
nyans via `color-mix(in srgb, grundton 82%, #000)`, utskriven som literal hex
i tokenfilen så att värdet är mätbart och inte beror på `color-mix`-stöd.

> **Regel: yta och stora grader = grundton. Interaktiva små element = strong.**
>
> Grundtonen är fortsatt den bärande ytan (header, hero, sektionsband) och
> gäller för stor text (≥24 px, eller ≥18,66 px bold) — den är oförändrad och
> ingen befintlig yta ska bytas ut. Strong används enbart där **liten vit text**
> ligger på färgen: knappar, chips, badges, taggar, aktiva menyrader,
> fokus-/hover-tillstånd och andra små interaktiva element.

| Token | Hex | Vit text | Grundton | Grundtonens vit-kontrast | Tailwind |
|---|---|---|---|---|---|
| `--nxt-studio-strong` | `#9F4C6E` | **5,63:1** | `#C25D86` | 4,04:1 ✗ | `nxt.studio-strong` |
| `--nxt-assist-strong` | `#277480` | **5,39:1** | `#2F8E9C` | 3,84:1 ✗ | `nxt.assist-strong` |
| `--nxt-test-strong` | `#347954` | **5,24:1** | `#3F9466` | 3,72:1 ✗ | `nxt.test-strong` |
| `--nxt-lexicon-strong` | `#906B27` | **4,86:1** | `#B0822F` | 3,45:1 ✗ | `nxt.lexicon-strong` |

Samtliga värden är uppmätta med samma räknare som kontrasttabellen nedan
(WCAG 2.1 relativ luminans), validerad mot facit vit/svart = 21,00,
vit/`#777777` = 4,48 och vit/`#767676` = 4,54. Nyansen är bevarad: HSL-vinkeln
skiftar ≤0,4° mellan grundton och strong-variant.

Som textfärg mot papper `#FAF7FB` ligger varianterna på 5,29 / 5,07 / 4,93 /
4,58 — alla klarar AA, så strong duger även till liten färgad text på papper
där grundtonen inte gör det.

`--nxt-learning` `#7E5A96`, `--nxt-docs` `#6B6677` (5,54:1) och
`--nxt-compliance` `#5C6FC0` (4,68:1) bär redan liten vit text och har därför
**ingen** strong-variant. För accent-agnostisk kod finns `--nxt-accent-strong`,
som varje app pekar om tillsammans med `--nxt-accent`; för dessa tre moduler
sätts den till samma värde som accenten.

```css
/* Bärande yta i grundton, knapp i strong */
.module-header { background: var(--nxt-accent); }          /* stor text OK */
.module-header .btn {                                       /* 13 px vit text */
  background: var(--nxt-accent-strong);
  color: #fff;
}
```

## Ytregler (bindande — Brand Book §03/§06)

- **Neutrala ytor** (dokument, tabeller, arbetsytor): papper-bakgrund,
  mono-lockup (violett märke + svart namn).
- **Bärande ytor** (header, hero, sektionsband): modulfärg fyller ytan,
  **vit reverserad lockup**.
- NXT-märket färgas **aldrig** om i accentfärg, förvrängs eller roteras.
- Modulfärger = accenter, ikoner, tillstånd, diagram. Aldrig stora textytor.
- Yta och stora grader använder **grundtonen**; små interaktiva element med vit
  text använder modulens **strong-variant** (se avsnittet ovan).
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
- Behövs liten **vit** text på en modulfärgad yta: använd modulens
  **strong-variant** (`--nxt-studio-strong` m.fl., se avsnittet ovan). Sedan
  v1.2.0 finns de som tokens i paketet — mörka inte längre på egen hand i
  konsumerande repos. På rosa räcker inte bläck heller (4,16:1) — där är
  mörkare yta enda vägen.
- Status kommuniceras alltid färg **+ ikon + text** (WCAG 1.4.1), så en
  underkänd färgkontrast aldrig ensam bär informationen.

## Typsnitt

Sora 300/400/600/700 (rubriker, lockups, brödtext) och JetBrains Mono
400/500 (etiketter, metadata, kod). Self-hostade woff2, latin subset,
OFL-1.1 (licensfiler i `/fonts`).

**Varumärkesgrader (brand book §07):** 48 / 28 px — display och rubrik.

**UI-register (v1.5.0):** 11 / 12 / 13 / 15 / 17 / 20 / 24 px med line-height
17 / 18 / 20 / 23 / 26 / 30 / 34. Absoluta px. Bas är
**13 px** (`--nxt-text-base`). Kvoter ≥ 1,5 utom `3xl` (1,417 — medvetet).

Brand book:s brödtext 16 px är läsgraden på marknads- och innehållsytor — den
är **inte** gränssnittets bastext. Efter nersänkningen 2026-08-07 sammanfaller
`--nxt-text-body` (16 px) och `--nxt-text-label` (12 px) inte längre med något
UI-steg, och har därför egna värden i stället för att alias:a in i registret.

## Logotypfiler

`logos/svg/` (27) och `logos/png/` (25, transparent 3×). Tre hanteringar
per produkt: `-primary` (ljus botten), `-reverse` (på modulfärgad yta),
`-black` (1-färg). Fristående märke: `nxt-mark-violet/white/black` +
`nxt-mark-violet-sig` (e-postsignatur, endast PNG). Koncernlockup:
`nxt-full-primary/reverse/black` (endast SVG i v1.3.0 — PNG-varianter saknas).

## Versionering

Semver via git-taggar. Brand book-ändring ⇒ ny tagg ⇒ bumpa
`#vX.Y.Z` i konsumerande repos `package.json`. Ingen registry behövs.

**nxt-brand är operativ källa till sanning och superseder brand book v1.0 där
uppmätta värden avviker (kontrasttabellen); boken uppdateras redaktionellt
separat.**

Bakgrunden är att bokens kontrastvärden i flera fall var för generösa — se
»Ändrat i v1.1.2«. Konsumenter ska mäta mot detta paket, inte mot boken. Två
konkreta fall där boken följdes och blev fel: bärnsten citerad som 3,6:1 i
KL Studio (rätt: 3,45) och blå citerad som 4,4:1 i Compliance OS med omvänd
slutsats (rätt: 4,68 för vit text på blått — 4,40 är blått *som textfärg mot
papper*, alltså motsatt riktning).
