# Utrullning — @nxt/brand v1.5.0 (skalelager)

**Tagg:** `v1.5.0` (ej satt ännu — väntar granskning) · **Källa till sanning:** NXT Brand Book v1.0 (2026)
**Föregående utrullning:** `docs/ROLLOUT-v1.4.0-familjelager.md`

> **Ordningen är bestämd.** Familjelagret (`feat/font-familj-sora`) tar 1.4.0
> eftersom det rättar ett synligt produktionsfel. Det här skalelagret följer som
> 1.5.0. Separata leveranser — de ska inte slås ihop.

---

## 1. Vad v1.5.0 tillför

**Ett UI-register.** Brand book §07 ger fyra grader: 48 / 28 / 16 / 12 px. Ett
gränssnitt byggs mellan 12 och 28 px, och där fanns ingenting. Följden var att
KL och wise uppfann var sitt register — sju steg vardera, med 1–2 px skillnad
på fyra av dem. Det här lägger registret i paketet, en gång.

Grunden var NXT Assist-skalan, men **justerad ner ett steg 2026-08-07** för
enterprise-täthet. Bas är **13 px**.

| Steg | Grad | Line-height | Kvot | Var (första utkast) |
|---|---|---|---|---|
| `2xs` | 10px | 15px | 1,50 | — (nytt) |
| `xs` | 11px | 17px | 1,545 | 12/18 |
| `sm` | 12px | 18px | 1,50 | 13/20 |
| `base` | **13px** | 20px | 1,538 | 14/21 |
| `lg` | 15px | 23px | 1,533 | 16/24 |
| `xl` | 17px | 26px | 1,529 | 18/27 |
| `2xl` | 20px | 30px | 1,50 | 22/33 |
| `3xl` | 24px | 34px | **1,417** | 26/39 |

**Varför ner.** Första utkastet ärvde wises höjda skala. Den höjningen gjordes
med motiveringen att Sora har lägre x-höjd än Inter. Uppmätt håller det inte
för det som faktiskt renderade — wise laddade aldrig Inter, utan föll till
`system-ui`:

| Typsnitt | x-höjd av em |
|---|---|
| Sora | **53,4 %** |
| Segoe UI (`system-ui`) | 50,0 % |
| Arial | 51,9 % |

Graderna höjdes alltså för att kompensera för ett typsnitt som inte ritade
texten. När Sora kopplades in i v1.4.0 kom höjningen ovanpå ett typsnitt som
redan läser ~7 % större — och resultatet såg överdimensionerat ut. Sänkningen
är i snitt **−7,4 %**, vilket ligger på x-höjdsdifferensen.

**`2xs` är ett golv, inte ett vanligt steg.** Det tillkom 2026-08-08 för att
wise hade 106 noder hårdkodade på 10 px — etiketter, metadata, taggar — som
annars stått utanför systemet för alltid. Alternativet, att runda upp dem till
`xs`, hade gjort dem större mitt i en omläggning vars syfte var täthet. Att
steget finns är inte en inbjudan att använda det, och ingenting under det ska
tillkomma: 9 px och mindre höjs hit.

**`3xl` är ett medvetet undantag** på 1,417. Regeln "alla kvoter ≥ 1,5" gäller
alltså inte längre utan undantag. 1,5 är brödtextsluft och blir slappt på en
rubrik. WCAG 1.4.12 kräver att användaren ska *kunna* sätta 1,5 utan att
layouten går sönder — inte att författaren gör det. Vill man ha invarianten
utan undantag är 36 rätt värde för `3xl`.

**`body` och `label` är inte längre alias.** De pekade in i registret när `lg`
råkade vara 16 px och `xs` 12 px. Efter sänkningen är `lg` 15 och `xs` 11, så
aliasen hade tyst gjort brand book:s brödtext till 15 px och etiketten till
11 px — en varumärkesändring insmugen via en UI-justering. Båda har egna
värden igen (16 respektive 12 px).

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

> **Läs den här raden.** Brand book:s brödtext **16 px är inte gränssnittets
> bastext**. UI-basen är `--nxt-text-base` = **13 px**. 16 px är läsgraden på
> marknads- och innehållsytor. Blandas de ihop får hela gränssnittet fel
> grundgrad.

`3xl` kommer inte ur wises kurerade skala — där slutade blocket vid `2xl`, så
`text-3xl` föll igenom till Tailwinds default och skalades av 81,25 %-roten
till ~24,4 px. 24 px är alltså i praktiken samma grad wise redan visade, nu
satt medvetet i stället för av misstag.

## 3. Varning — additivt i tokens, brytande i presetet

Tokens-filen är rent additiv: inga befintliga värden ändras, `body` och `label`
behåller 16 respektive 12 px.

**Presetet är det inte.** `xs`–`3xl` överstyr nu Tailwinds egen skala för alla
v3-konsumenter. Det är avsikten — det är så en app slipper underhålla ett eget
register — men konsekvensen skiljer sig per app:

| App | Tailwind | Effekt av enbart pinne-bump |
|---|---|---|
| **wise** | v3 | **Texten krymper ett steg.** Wises lokala block sätter 12/13/14/16/18/22; registret sätter 11/12/13/15/17/20. Det lokala blocket vinner tills det tas bort — men presetets `3xl` (24) slår igenom direkt, eftersom wise inte definierar det steget. |
| **KL Studio** | v4 | **Ingen.** Presetet gäller inte i v4; KL måste peka sitt `@theme` mot variablerna för att ärva. **Räkna med stor förändring när den gör det** — KL kör bas 16 px mot registrets 13. |
| **Compliance OS** | v3 | **Typografin ändras.** Appen lutar sig på Tailwinds default och får nya grader enbart av att pinnen flyttas. |
| **NXT Admin** | v3 | Konsumerar inte paketet i dag. Gäller först vid adoption. |

> Raden om wise ändrades 2026-08-07. I första utkastet stod "Ingen — samma
> siffror". Det gällde när registret ärvde wises höjda skala. Efter
> nersänkningen gör det inte det längre.

Adoption är alltså **opt-in per app**, men för en v3-app som inte redan
överstyr är en bump inte opt-in — den räcker. Compliance OS ska inte bumpas
utan att någon tittar på typografin i samma leverans.

## 4. Versionsval

Satt till **1.5.0** — familjelagret tog 1.4.0.

Argumentet för `2.0.0` kvarstår oberoende av numret: presetet tar över nycklar
det inte ägde förut, vilket ändrar renderad output för en oförberedd
v3-konsument, och semver ska bära den varningen — inte en README. Argumentet
för en minor är att inga befintliga tokens ändrar värde och att de två faktiska
konsumenterna (wise, KL) är opåverkade av bumpen i sig.

Ett beslut för granskningen, inte för mig.

## 5. Repo-rad per konsument

Ingen app är rörd i den här leveransen. När registret är granskat:

- **wise** — utfört på `feat/brand-v150-skala`: `fontSize`-blocket och de sju
  `--text-*` borttagna, och samtliga 138 hårdkodade grader inflyttade i
  registret (26 × 11px → `xs`, 106 × 10px → `2xs`, 6 × 9px höjda till `2xs`).
  Ingen nod står längre utanför systemet.
- **KL Studio** — mappa `--text-*` i `@theme` mot `--nxt-text-*` /
  `--nxt-leading-*` och ta bort de sju egna värdena i `src/styles/tokens.css`.
- **Compliance OS / NXT Admin** — se §3 innan pinnen flyttas.

Kvar oavsett register: wises `81.25%`-rot gör dess luft ~19 % tätare än KL:s.
Samma typskala ger inte samma intryck förrän den frågan är avgjord separat.
