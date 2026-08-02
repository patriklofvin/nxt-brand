# Utrullning — @nxt/brand v1.3.0

**Tagg:** `v1.3.0` · **Källa till sanning:** NXT Brand Book v1.0 (2026)
**Föregående utrullning:** `docs/ROLLOUT-v1.1.0.md`

Så här använder respektive CC-session detta dokument:

> "Läs `docs/ROLLOUT-v1.3.0.md` i nxt-brand-repot (`github:patriklofvin/nxt-brand`) och utför din repo-rad."

---

## 1. Vad v1.2.0 och v1.3.0 tillför

Additivt. Inga brytande ändringar — men se varningen om `--nxt-accent-strong` i §3.

**v1.2.0 — strong-varianter för liten vit text.** Fyra modulfärger bär inte
liten vit text. Varje sådan modul fick en mörkad variant med bevarad nyans:

| Token | Hex | Vit text | Grundton |
|---|---|---|---|
| `--nxt-studio-strong` | `#9F4C6E` | 5,63:1 | `#C25D86` 4,04 ✗ |
| `--nxt-assist-strong` | `#277480` | 5,39:1 | `#2F8E9C` 3,84 ✗ |
| `--nxt-test-strong` | `#347954` | 5,24:1 | `#3F9466` 3,72 ✗ |
| `--nxt-lexicon-strong` | `#906B27` | 4,86:1 | `#B0822F` 3,45 ✗ |

Regel: **yta och stora grader = grundton, interaktiva små element = strong.**

**v1.3.0 — neutralskala.** Brand book v1.0 har bläck och papper men inget
däremellan, så varje konsument uppfann sin egen gråskala.

| Token | Värde | Mot papper | Användning |
|---|---|---|---|
| `--nxt-ink-soft` | `#736F78` | **4,62:1** ✓ | Sekundärtext |
| `--nxt-line` | `#DCD8DD` | 1,33:1 | Avdelare/ramar, **aldrig text** |

62 % är golvet — 60 % ger 4,35:1 och underkänns. `--nxt-line` klarar inte 3:1
(WCAG 1.4.11) och får aldrig ensam identifiera en komponent eller dess tillstånd.

**v1.3.0 — koncernlockup.** `nxt-full-primary`, `nxt-full-reverse`,
`nxt-full-black` i `logos/svg/`. Används där NXT som helhet är avsändare (nav,
plattformschrome, sidfötter, dokumentomslag); produktlockups används när en
specifik produkt refereras. `nxt-full-reverse` har medvetet **ingen** inbakad
bakgrundsyta — den läggs på vilken bärande yta som helst.

Tailwind-nycklar: `nxt.{studio,assist,test,lexicon}-strong`, `nxt.accent-strong`,
`nxt.ink-soft`, `nxt.line`.

---

## 2. Relay-rader per repo

### nxt-web (`Nxt-web-repo`) — gör detta nu

Sajten är statisk utan byggsteg och **vendorar** paketets filer under
`assets/brand/` i stället för att npm-installera (se `docs/CR-BRAND-8.md`).
Vendorade filer uppdateras inte av sig själva.

1. Kopiera om `css/{fonts.css,nxt-tokens.css}`, `fonts/*`, och lockup-SVG:erna
   från taggen `v1.3.0` till `assets/brand/`.
2. Ta bort de lokala neutralvärdena i `styles.css` och peka om:
   - `--ink-soft:#494351` → `var(--nxt-ink-soft)`
   - `--line:#E7E2EC` → `var(--nxt-line)`
   Båda står i dag som "utan motsvarighet i brand book v1.0" i CR-BRAND-8
   §Avvikelser — den anteckningen kan strykas.
3. Byt den **lokalt komponerade header-lockupen** (märke + `<span>NXT</span>`)
   mot paketets `nxt-full-primary.svg` som en enda `<img>`. CSS-reglerna
   `.brand-mark-img` / `.brand-mark-name` kan då tas bort.
4. Uppdatera versionsnoteringen i `styles.css`-kommentaren och CR-BRAND-8.

Notera att `--ink-soft` byter värde: `#494351` → `#736F78`. Den nya är ljusare
men uppmätt godkänd (4,62:1). Kontrollera lede-texter i QA.

### Övriga repos — vid nästa beröring

Ingen tvingande åtgärd nu. Ta detta när repot ändå öppnas:

| Repo | Nuvarande | Åtgärd |
|---|---|---|
| `kl-studio` | v1.1.2 | Bumpa. Har en lokal `--nxt-accent-strong` `#9F4C6E` som nu finns som `--nxt-studio-strong` i paketet — byt mot tokenet. |
| `wise-assist-ai` | v1.2.0 på `feat/cr-brand-1` | Bumpa vid nästa branding-beröring. Neutralskalan kan ersätta lokala gråvärden i `tokens.css`. |
| `ahrant-platform/admin` | v1.1.1 | Bumpa. Använder det fristående märket i topbar — överväg `nxt-full-*` i plattformschromen, som är just en helhets-avsändare. |
| `compliance-os` | — | Del A av CR-BRAND-7 bygger på v1.2.0+; ta v1.3.0 direkt. |

---

## 3. Fälla att känna till: `--nxt-accent-strong`

v1.2.0 införde en **generisk** `--nxt-accent-strong` som defaultar till
`var(--nxt-learning)` i `:root`. Konsumenter som sätter sin accent i en fil som
laddas **före** `nxt-tokens.css` får brand-defaulten, inte sitt eget värde.

Symptom: turkosa/rosa ytor blir violetta efter bumpen.

Åtgärd: sätt `--nxt-accent-strong` i samma `:root` där `--nxt-accent` sätts, och
se till att den blocket ligger **efter** `@import` av `nxt-tokens.css`. Så löstes
det i wise-assist (`src/styles/globals.css`); verifiera i byggd CSS att ditt
värde kommer sist.

---

## 4. Verifiering

Kontrastvärdena ovan är uppmätta med WCAG 2.1 relativ luminans, med räknaren
validerad mot facit vit/svart = 21,00 och vit/`#767676` = 4,54. Koncernlockupens
proportioner är härledda ur faktisk Sora-metrik och kalibrerade mot de befintliga
produktlockuparna (modellen reproducerar deras viewBox-bredder exakt).
