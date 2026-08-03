# DoD-granskning — CR-BRAND-0 (nxt-brand)

**Granskat:** `main` @ `3b51564`, tagg `v1.3.0` · **Datum:** 2026-08-03
**CR-dokument:** `nxt-docs/dd/04-products/cr/CR-BRAND-0.md` (repo-lokalt: pekare, Rule 9)
**Granskningsordning:** 0 av 6 (nxt-brand → wise → KL → Compliance → ahrant → nxt-web)

## Granskarens oberoende — läs detta först

**Denna granskning är inte oberoende i Rule 8:s mening.** Granskaren skrev
v1.2.0 och v1.3.0 i detta repo (strong-varianter, neutralskala, koncernlockup).
Att verifiera sitt eget arbete reproducerar samma blinda fläckar som fanns när
det skrevs, och ger ingen oberoende motpart till designbesluten.

Det som ändå bär: **reproduktionen**. Kommandon och uträkningar nedan är
objektiva och kan köras om av vem som helst. Vad granskningen *inte* ersätter är
en andra bedömning av om besluten var rätt.

Rule 8-sign-off kvarstår därför som en Patrik-punkt. CR-BRAND-2/2b och 6 är
skrivna av andra och blir närmast oberoende i den här serien.

---

## DoD-punkter

### 1. Repo `nxt-brand` skapat med struktur enligt CR, taggat `v1.0.0` — VERIFIERAD

```
$ git tag -l
v1.0.0  v1.0.1  v1.1.0  v1.1.1  v1.1.2  v1.2.0  v1.3.0
$ git ls-tree -r --name-only v1.0.0 | wc -l
62
```

Taggen finns och pekar på ett träd med 62 filer. Strukturen (`css/`, `fonts/`,
`logos/svg`, `logos/png`, `tailwind.preset.js`) är intakt i HEAD.

### 2. Alla 49 logotypfiler incheckade, filnamn utan mellanslag — VERIFIERAD

```
$ git ls-tree -r --name-only v1.0.0 -- logos | wc -l
49
$ ls logos/svg | wc -l → 27    $ ls logos/png | wc -l → 25    (52 i HEAD)
$ ls logos/svg logos/png | grep " " → inga träffar
```

Exakt 49 vid `v1.0.0`, precis som DoD:n påstår. HEAD har 52 eftersom v1.3.0 la
till tre koncernlockups; ökningen är dokumenterad i README (»27 SVG«).

### 3. `nxt-tokens.css` + `tailwind.preset.js` verifierade mot brand book v1.0 — DELVIS / EJ VERIFIERBAR HÄR

**Brand book v1.0 finns inte i något repo** (`find` över nxt-docs ger noll
träffar), så påståendet »verifierat mot brand book« går inte att reproducera.
Det som *kan* verifieras är intern konsistens, och den är hel:

Samtliga sju rader i README:s huvudkontrasttabell räknades om oberoende ur
WCAG 2.1 relativ luminans, med räknaren först validerad mot facit:

| Facit | Resultat |
|---|---|
| vit/svart | 21,00 ✓ |
| vit/`#777777` | 4,48 ✓ |
| vit/`#767676` | 4,54 ✓ |

| Yta | README vit text | Omräknat | README papper | Omräknat |
|---|---|---|---|---|
| `#7E5A96` | 5,54 | **5,54** | 5,21 | **5,21** |
| `#6B6677` | 5,54 | **5,54** | 5,21 | **5,21** |
| `#5C6FC0` | 4,68 | **4,68** | 4,40 | **4,40** |
| `#C25D86` | 4,04 | **4,04** | 3,80 | **3,80** |
| `#2F8E9C` | 3,84 | **3,84** | 3,61 | **3,61** |
| `#3F9466` | 3,72 | **3,72** | 3,50 | **3,50** |
| `#B0822F` | 3,45 | **3,45** | 3,25 | **3,25** |

Även »Ändrat i v1.1.2«-tabellens *uppmätt*-kolumn stämmer på alla fem rader.

Strong-varianterna: alla fyra följer 82 %-regeln exakt och når sitt påstådda
värde — `studio` 5,63 · `assist` 5,39 · `test` 5,24 · `lexicon` 4,86, samtliga
≥4,5:1 mot vit.

Neutralskalan: `--nxt-ink-soft` 62 % → `#736F78`, **4,62:1** mot papper.
`--nxt-line` 14 % → `#DCD8DD`, 1,33:1 (dokumenterad som icke-textbärande).

Preset: samtliga färgtokens i `nxt-tokens.css` är exponerade i
`tailwind.preset.js`, och presetet innehåller **ingen rå hex** — allt via `var()`.

**Vad som krävs för full verifiering:** brand book v1.0 som artefakt (PDF eller
motsvarande) att stämma av paletten mot. Patrik-punkt.

### 4. Fonts self-hostade som woff2, licens kontrollerad — VERIFIERAD

```
$ for f in fonts/*.woff2; do head -c 4 "$f" | xxd -p; done
774f4632  (× 6)   = "wOF2"
```

Alla sex filer är äkta woff2, inte omdöpta ttf. Sora 300/400/600/700 och
JetBrains Mono 400/500. Båda licensfilerna finns och anger **SIL Open Font
License 1.1**. Sora-attributionen pekar på `sora-xor/sora-font`, vilket är
korrekt uppström för Google Fonts Sora.

### 5. Testinstallation från GitHub-URL i konsumerande repo — VERIFIERAD

`kl-studio` konsumerar paketet skarpt:

```
package.json:      "@nxt/brand": "github:patriklofvin/nxt-brand#v1.1.2"
package-lock.json: resolved ...nxt-brand.git#31055da6ee47e4b39f32ca381e851b01392c1974
$ git rev-parse v1.1.2^{}
31055da6ee47e4b39f32ca381e851b01392c1974
```

**Lockfilen pinnar samma commit som taggen** — ingen drift.

Anonym åtkomst utan credentials verifierad för aktuell tagg:
`ls-remote` ger `refs/tags/v1.3.0^{}` = `3b51564` = lokal `v1.3.0^{}`.

### 6. Manthan DoD-sign-off (Rule 8) — EJ VERIFIERBAR HÄR

Kräver Manthan. Se dessutom oberoendeförbehållet överst — granskaren kan inte
utgöra den motparten för v1.2.0/v1.3.0.

---

## Reviewer-kriterier utöver CR:ns DoD

### Sanering `2563eb|825b94` — VERIFIERAD med anmärkning

```
$ grep -rniE "2563eb|825b94" . --exclude-dir=.git
css/nxt-tokens.css:11:  --nxt-violet: #7E5A96;  /* ... ERSÄTTER #825B94 och #2563EB */
```

Repot har varken `src/` eller `public/`. Den enda träffen är den **dokumenterande
kommentaren** som förklarar vad violetten ersätter — inget levande värde.

*Anmärkning:* ett konsumerande repo som kör samma grep brett (inte bara mot
`src/`) och råkar inkludera `node_modules/@nxt/brand` får en falsk träff.
Gaten bör scopas, eller kommentaren formuleras utan hex-literalerna.

### tsc / testsvit / build — EJ TILLÄMPLIGT

```
$ node -p "require('./package.json').scripts"
inga scripts
```

Paketet är rena CSS-, font- och SVG-tillgångar utan byggsteg, TypeScript eller
testsvit. Ingenting att köra. Motsvarande verifiering sker i konsumerande repos
(granskning 1, 3+7, 8).

### Ytregler — VERIFIERAD

Tokenfilens hex-literaler är inneboende (det är palettdefinitionen).
Strong-varianterna är literal hex och **bär motiverande kommentar**:

> `css/nxt-tokens.css:37-41` — »Skrivna som literal hex så att värdet är mätbart
> och inte beror på color-mix-stöd.«

Presetet innehåller ingen hårdkodad modulfärg. SVG-tillgångarnas hex är
inneboende i filformatet.

### Nya tillgångar (v1.3.0) — VERIFIERAD

De tre koncernlockuparna är välformad XML (`xml.dom.minidom.parse` utan fel),
har viewBox `616×156`, vikt 700 och text `NXT`. Bredden 616 följer av faktisk
Sora-metrik plus frizon 18, och samma modell reproducerar produktlockuparnas
viewBox-bredder exakt.

### Commit-serie — GODKÄND MED ANMÄRKNING

```
f8ff6b3  v1.2.0: per-modul strong-varianter   (4 filer)
3b51564  v1.3.0: neutralskala + koncernlockup (8 filer)
```

Inga orelaterade ändringar insmugna; varje commit rör bara sina egna filer.

*Anmärkning:* `3b51564` buntar **två oberoende omfattningspunkter** —
neutralskalan och koncernlockupen — i en commit. Kriteriet »en commit per
omfattningspunkt« är inte uppfyllt, och den ena kan inte återställas utan den
andra.

### FEATURES.md — EJ TILLÄMPLIGT

Repot har ingen FEATURES.md och kräver ingen; det är ett rent tillgångspaket.

### Dokumenterade avvikelser vs kod — VERIFIERAD

Kontrollerat att inget avviker odokumenterat:

- `nxt-full-reverse` saknar inbakad bakgrundsyta medan produktlockuparnas
  reverse-filer har en. **Dokumenterat** i README som avsiktligt.
- Koncernlockupen sätts i Sora 700 mot produktlockuparnas 600. **Dokumenterat.**
- Koncernlockupen finns bara som SVG, inte PNG. **Dokumenterat** i README.
- `--nxt-accent-strong` defaultar till `var(--nxt-learning)` och kan kapa
  konsumenters accent vid fel importordning. **Dokumenterat** i
  `docs/ROLLOUT-v1.3.0.md §3`.

Inget odokumenterat avvikande hittat.

---

## Utfall: GODKÄND MED ANMÄRKNING

Alla reproducerbara DoD-punkter håller. Sifferpåståendena i README stämmer på
andra decimalen, lockfilen pinnar rätt commit, fonterna är äkta och licenserna
korrekta.

### Åtgärdslista

1. **Oberoende sign-off saknas.** Granskaren skrev v1.2.0/v1.3.0. Rule 8 kräver
   en annan part. *(Patrik/Manthan — kvarstår. Beslut 2026-08-03: oberoendet
   accepteras som det är, protokollens öppna deklaration räcker.)*
2. **Brand book v1.0 finns inte som artefakt** i något repo, så DoD-punkt 3 kan
   aldrig verifieras av någon. → **ÅTGÄRDAD i v1.3.1.** README §Versionering
   fastställer att paketet är operativ källa till sanning och superseder boken
   där uppmätta värden avviker. Bokens redaktion är parkerad post-RC1.
3. **`3b51564` buntar två omfattningspunkter.** Ingen åtgärd i efterhand —
   noteras för kommande taggar. *(Kvarstår som notering.)*
4. **Grep-gaten kan ge falsk träff** på den dokumenterande kommentaren i
   `nxt-tokens.css:11`. → **ÅTGÄRDAD i v1.3.1.** Kommentaren är omformulerad
   utan legacy-hexvärden i klartext. Fyndet materialiserades i nxt-web
   (`DOD-CR-BRAND-8.md` punkt 1), som vendorar paketet i stället för att
   npm-installera det.

### Status efter v1.3.1

Punkt 2 och 4 är åtgärdade i källan. Punkt 1 och 3 är accepterade som de är.
Utfallet **GODKÄND MED ANMÄRKNING** står — anmärkningarna är hanterade, inte
bortförklarade.

Inget av detta blockerar merge av paketet i sig. Punkt 1 blockerar formell
Rule 8-sign-off.

**Merge-beslut: Patriks.** Ingenting har mergats av granskaren.
