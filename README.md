# @nxt/brand

NXT design-tokens, logotyper och typsnitt — **en central källa för hela
plattformen**. Källa till sanning: **NXT Brand Book v1.0 (2026)**.
Ändringar görs endast här, taggas, och bumpas i konsumerande repos.

## Installation

```bash
npm i github:patriklofvin/nxt-brand#v1.0.0
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

## Ytregler (bindande — Brand Book §03/§06)

- **Neutrala ytor** (dokument, tabeller, arbetsytor): papper-bakgrund,
  mono-lockup (violett märke + svart namn).
- **Bärande ytor** (header, hero, sektionsband): modulfärg fyller ytan,
  **vit reverserad lockup**.
- NXT-märket färgas **aldrig** om i accentfärg, förvrängs eller roteras.
- Modulfärger = accenter, ikoner, tillstånd, diagram. Aldrig stora textytor.
- Minsta logotypstorlek digitalt: **24 px höjd**. Frizon: X-höjden.

## Kontrast (WCAG AA) — vit text mot modulyta

| Yta | Kontrast | Vit text OK? |
|---|---|---|
| Violett `#7E5A96` | 4,9:1 | Ja |
| Skiffer `#6B6677` | 5,0:1 | Ja |
| Turkos `#2F8E9C` | 4,6:1 | Ja (verifiera states) |
| Rosa `#C25D86` | ~4,5:1 | Precis — verifiera states |
| Blå `#5C6FC0` | 4,4:1 | **Endast ≥24 px / 18,66 px bold** |
| Grön `#3F9466` | 3,9:1 | **Endast ≥24 px / 18,66 px bold** |
| Bärnsten `#B0822F` | 3,6:1 | **Endast ≥24 px** — annars text i bläck |

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
