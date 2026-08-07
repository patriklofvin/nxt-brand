# Utrullning — @nxt/brand v1.4.0

**Tagg:** `v1.4.0` (ej satt ännu — väntar granskning) · **Källa till sanning:** NXT Brand Book v1.0 (2026)
**Föregående utrullning:** `docs/ROLLOUT-v1.3.0.md`

---

## 1. Vad v1.4.0 tillför

**Ett UI-register.** Brand book §07 ger fyra grader: 48 / 28 / 16 / 12 px. Ett
gränssnitt byggs mellan 12 och 28 px, och där fanns ingenting. Följden var att
KL och wise uppfann var sitt register — sju steg vardera, med 1–2 px skillnad
på fyra av dem. Det här lägger registret i paketet, en gång.

Grunden är **NXT Assist-skalan (14 px bas)**, mätt ur wise efter
läsbarhetsfixen.

| Steg | Grad | Line-height | Kvot |
|---|---|---|---|
| `xs` | 12px | 18px | 1,50 |
| `sm` | 13px | 20px | 1,538 |
| `base` | **14px** | 21px | 1,50 |
| `lg` | 16px | 24px | 1,50 |
| `xl` | 18px | 27px | 1,50 |
| `2xl` | 22px | 33px | 1,50 |
| `3xl` | 26px | 39px | 1,50 |

Varumärkesgraderna `display` (48) och `heading` (28) är oförändrade och ligger
kvar ovanför registret.

## 2. Tre val som är värda att förstå

**Absoluta px, inte rem.** wise sätter `html { font-size: 81.25% }` för att
hålla Tailwinds rem-baserade spacing tät. Rem-värden i paketet hade skalats av
den roten och gett rätt grader i KL men fel i wise. Px ger samma utfall i båda
utan att någon app behöver röra sin rot — och roten får inte röras, eftersom
all padding, alla höjder och alla radier följer med.

**Line-height som egen variabel per steg.** Paren låg tidigare bara i presetens
tupler, alltså enbart åtkomliga för Tailwind v3. KL kör v4 och läser CSS-
variabler via `@theme`. Utan variabelburen leading kan v4-sidan inte återskapa
paren, och kravet på kvoter ≥ 1,5 tappas på vägen.

**`body` och `label` blev roller, inte grader.** De alias:ar nu in i registret
(`body` → `lg`, `label` → `xs`) så att varje px-tal har exakt en definition.

> **Läs den här raden.** Brand book:s brödtext **16 px är inte gränssnittets
> bastext**. UI-basen är `--nxt-text-base` = **14 px**. 16 px är läsgraden på
> marknads- och innehållsytor. Blandas de ihop får hela gränssnittet fel
> grundgrad.

`3xl` är det enda steget som inte kommer ur wises kurerade skala — där föll
`text-3xl` igenom till Tailwinds default och skalades av 81,25 %-roten till
~24,4 px. 26 px är wises egen token-nivå, nu satt medvetet i stället för av
misstag.

## 3. Varning — additivt i tokens, brytande i presetet

Tokens-filen är rent additiv: inga befintliga värden ändras, `body` och `label`
behåller 16 respektive 12 px.

**Presetet är det inte.** `xs`–`3xl` överstyr nu Tailwinds egen skala för alla
v3-konsumenter. Det är avsikten — det är så en app slipper underhålla ett eget
register — men konsekvensen skiljer sig per app:

| App | Tailwind | Effekt av enbart pinne-bump |
|---|---|---|
| **wise** | v3 | **Ingen.** Samma siffror som dess lokala block redan sätter. Blocket kan tas bort efteråt. |
| **KL Studio** | v4 | **Ingen.** Presetet gäller inte i v4; KL måste peka sitt `@theme` mot variablerna för att ärva. |
| **Compliance OS** | v3 | **Typografin ändras.** Appen lutar sig på Tailwinds default och får nya grader enbart av att pinnen flyttas. |
| **NXT Admin** | v3 | Konsumerar inte paketet i dag. Gäller först vid adoption. |

Adoption är alltså **opt-in per app**, men för en v3-app som inte redan
överstyr är en bump inte opt-in — den räcker. Compliance OS ska inte bumpas
utan att någon tittar på typografin i samma leverans.

## 4. Versionsval

Satt till **1.4.0**. Argumentet för `2.0.0` är att presetet tar över nycklar
det inte ägde förut, vilket ändrar renderad output för en oförberedd
v3-konsument — och semver ska bära den varningen, inte en README. Argumentet
för `1.4.0` är att inga befintliga tokens ändrar värde och att de två faktiska
konsumenterna (wise, KL) är opåverkade av bumpen i sig.

Ett beslut för granskningen, inte för mig.

## 5. Repo-rad per konsument

Ingen app är rörd i den här leveransen. När registret är granskat:

- **wise** — ta bort `fontSize`-blocket i `tailwind.config.ts` och de sju
  `--text-*` i `src/styles/tokens.css`. Kvar står `text-3xl`, som i dag ligger
  utanför den kurerade skalan, och de 106 `text-[10px]` + 26 `text-[11px]` som
  förbigår skalan helt.
- **KL Studio** — mappa `--text-*` i `@theme` mot `--nxt-text-*` /
  `--nxt-leading-*` och ta bort de sju egna värdena i `src/styles/tokens.css`.
- **Compliance OS / NXT Admin** — se §3 innan pinnen flyttas.

Kvar oavsett register: wises `81.25%`-rot gör dess luft ~19 % tätare än KL:s.
Samma typskala ger inte samma intryck förrän den frågan är avgjord separat.
