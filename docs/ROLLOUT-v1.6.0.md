# Utrullning — @nxt/brand v1.6.0 (neutralregister)

**Tagg:** `v1.6.0` · **Källa till sanning:** NXT Brand Book v1.0 (2026)
**Föregående utrullning:** `docs/ROLLOUT-v1.5.0.md`

---

## 1. Varför

Brand book ger bläck och papper. v1.3.0 la till `ink-soft` och `line` med
motiveringen att *"varje konsument uppfann sin egen gråskala"*. Två tokens
räckte inte — ett gränssnitt använder tio steg.

Följden syntes i mätning av alla tre apparna:

| Modul | Egen neutralskala | Använde brand-neutraler |
|---|---|---|
| wise | `#FAFAF9` / `#737371` / `#171717` (stengrå) | 2 ggr |
| KL Studio | **identiska värden** | 19 ggr |
| Testcenter | `#f8fafc` / `#0f172a` (kall slate) | 0 |

Ingen av dem är varumärkets varma, violettonade grund. Och neutralerna är det
man faktiskt ser: i Testcenter användes `ink-*` **237 gånger** mot `brand-*`
**6**. Accent och typografi var brandade sedan tidigare — grunden var det inte.

## 2. Registret

Härlett med samma metod som `ink-soft` (62 %) och `line` (14 %):
`color-mix(in srgb, var(--nxt-ink) N%, var(--nxt-paper))`. Fyra steg är
**ankare** som pekar på befintliga tokens, så varje färg har fortfarande en
enda definition.

**Kontrasten är uppmätt, inte antagen.** Räknaren validerad mot paketets egna
facit: 62 % → 4,62:1 och 14 % → 1,33:1.

| Steg | Bläck | Hex | Mot papper | Får bära |
|---|---|---|---|---|
| `50` | 0 % | `#FAF7FB` | 1,00:1 | sidbakgrund — **ankare: paper** |
| `100` | 6 % | `#EDEAEE` | 1,12:1 | subtil yta |
| `200` | 14 % | `#DCD8DD` | 1,33:1 | avdelare — **ankare: line** |
| `300` | 26 % | `#C2BEC4` | 1,72:1 | tydligare dekorativ ram |
| `400` | 48 % | `#928D95` | **3,06:1** | **ram som bär betydelse** |
| `500` | 62 % | `#736F78` | **4,62:1** | sekundärtext — **ankare: ink-soft** |
| `600` | 72 % | `#5E5962` | 6,41:1 | text |
| `700` | 82 % | `#48434D` | 9,04:1 | text |
| `800` | 90 % | `#37313C` | 11,85:1 | text |
| `900` | 100 % | `#211B27` | 15,80:1 | primärtext — **ankare: ink** |

**Regeln: 50–400 bär aldrig text.** `400` ligger på 48 % just för att korsa
**3:1** (WCAG 1.4.11) — under det kan en ram inte vara det enda som
identifierar en komponent eller dess tillstånd. `500` är golvet för
sekundärtext och ska inte sänkas lokalt.

## 3. `--nxt-surface`

`#FFFFFF`. Vit yta **på** papper: kort, paneler, tabellrader. Brand book saknar
token för det — papper är sidan, inte kortet. Utan den hårdkodade varje modul
`#ffffff` själv, vilket är samma glapp som neutralskalan hade.

## 4. Exponering

CSS-custom-properties för Tailwind v4 (`@theme`), och `colors.nxt.neutral-*` +
`colors.nxt.surface` i presetet för v3. Samma mönster som skalelagret.

## 5. Repo-rad per konsument

Byt modulens egna neutraler mot registret: bakgrund → `neutral-50`/`paper`,
kort → `surface`, text → `neutral-900`/`ink`, sekundärtext → `neutral-500`,
ramar → `neutral-200` (dekor) eller `neutral-400` (bärande).

- **wise** — `--neutral-50…900` i `src/styles/tokens.css`
- **KL Studio** — samma skala, samma fil
- **Testcenter** — `--color-ink-50…950` + `--color-bg` i `src/index.css`.
  `ink-950` är oanvänd och stryks. `ink-400` bär text på sex ställen och
  ligger under AA — de måste granskas, inte mappas rakt.

**Rör inte:** kursinnehållets serif i KL (`ArticleReadPage`, Cormorant), de
kundvalbara kurstypsnitten (KL `index.html`, wise `OrganisationerPage:425`),
och modulaccenterna — de är redan rätt, och brand book säger att accent aldrig
är bärande yta.

## 6. Detta är ett designbeslut, inte en buggfix

Till skillnad från typskalan, som var mätbart fel, är den nuvarande stengrån
inte trasig — den är bara inte varumärkets. wise och KL går från `#FAFAF9` till
`#FAF7FB` och från `#171717` till `#211B27`. Det är hela gränssnittets
grundton, i tre appar samtidigt. QA per modul, en i taget.
