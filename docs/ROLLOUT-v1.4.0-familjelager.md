# Utrullning — @nxt/brand v1.4.0 (familjelager)

**Tagg:** `v1.4.0` (ej satt — väntar granskning) · **Beslut:** allt är Sora, ingen redaktionell serif (2026-08-07)
**Föregående utrullning:** `docs/ROLLOUT-v1.3.0.md`

> **Versionskonflikt att lösa först.** Branchen `feat/ui-typskala` (skalelagret,
> xs–3xl) sätter också `1.4.0`. Bara en av dem kan behålla numret. Förslag:
> familjelagret tar **1.4.0** eftersom det rättar ett synligt fel i produktion,
> och skalelagret rebasas till **1.5.0**. De två ska levereras var för sig och
> inte blandas.

---

## 1. Vad v1.4.0 gör

**Paketet sätter familjen i stället för att bara namnge den.**

Fram till nu erbjöd paketet `--nxt-font-sans` och hoppades att någon använde
den. KL gjorde det. wise definierade om `--font-sans` till DM Sans i en fil som
importeras efter tokens — och eftersom wise inte laddar DM Sans föll hela
gränssnittet till `system-ui`. Sora hämtades ner och användes på noll ytor.

Tre ändringar:

- `html { font-family: var(--nxt-font-sans) }` i `nxt-tokens.css` — ärvt värde
  blir Sora som utgångsläge.
- `--nxt-font-display: var(--nxt-font-sans)` — nytt token. Namnet `display`
  behålls eftersom apparna har det bundet på många ställen; det pekar nu på
  Sora i stället för på en serif.
- Presetets `fontFamily` pekar på custom properties i stället för literaler och
  får nyckeln `display`. En källa för både v3 (preset) och v4 (`@theme`).

## 2. Vad som INTE ingår

**Sora 500 saknas.** Paketet self-hostar 300/400/600/700. Apparna använder
`font-medium` (vikt 500) på **402 ställen** — 167 i KL, 235 i wise — och
paketets eget `nxt-label` anger `fontWeight: '500'`. Utan en 500-skärning
matchar CSS ned till 400, så all "medium"-text renderas som normal.

Det kräver att någon lägger till `fonts/sora-latin-500-normal.woff2` plus ett
`@font-face`-block. Jag har inte lagt till filen — en typsnittsfil ska inte
materialiseras av en session, den ska hämtas från källan (OFL-1.1) och
granskas. **Detta är den enda kända luckan i "fulla viktregistret".**

## 3. Mätt läge före ändring

| | KL Studio | wise |
|---|---|---|
| Self-hostade via paketet | Sora, JetBrains Mono | Sora, JetBrains Mono |
| Externt via Google Fonts | **Cormorant Garamond, Fraunces, Playfair Display, DM Sans, Inter** | **inga** |
| `--font-sans` löser till | Sora ✓ | **DM Sans — aldrig laddad** |
| `h1/h2/h3` löser till | Playfair (via `font-display`-klassen) | **DM Serif Display — aldrig laddad → Georgia/Times** |

**Rättelse mot tidigare rapport i samma ärende:** jag skrev att Cormorant
Garamond och DM Sans aldrig laddas i KL. Det var fel. De laddas — inte via
`@font-face` i bundlen utan via `<link>` i `index.html:22`. I KL är serifen
alltså ett medvetet val som fungerar, inte en tyst fallback. Den tysta
fallbacken finns bara i wise, som inte laddar någonting externt.

Konsekvensen för det här beslutet är ändå densamma: allt ska bli Sora. Men
skälet skiljer sig per app — KL byter bort en serif som fungerar, wise
slutar peka på typsnitt som inte finns.

## 4. App-rader som ska bort — dokumenterat, ej utfört

### wise-assist-ai — detta fixar hela UI:t

| Fil:rad | Innehåll | Åtgärd |
|---|---|---|
| `src/index.css:53` | `--font-sans: 'DM Sans', system-ui, sans-serif;` | **Ta bort.** Paketet levererar familjen. Detta ensamt återställer Sora i hela gränssnittet. |
| `src/index.css:54` | `--font-display: 'DM Serif Display', Georgia, serif;` | **Ta bort.** |
| `src/index.css:69–71` | `h1, h2, h3 { font-family: var(--font-display); }` | Ta bort, **eller** peka om till `var(--nxt-font-display)`. Lämnas den kvar med rad 54 borttagen blir variabeln odefinierad — harmlöst men slarvigt. |
| `src/pages/Embed.tsx:453` | `fontFamily: "'DM Sans', system-ui, sans-serif"` | Hårdkodad i inline-style. Peka om till `var(--nxt-font-sans)`. |
| `src/pages/OrganisationerPage.tsx:425` | `<SelectItem value="DM Sans">` | **Rör inte.** Detta är ett typsnittsval som erbjuds kundorganisationer för deras branding — en annan sak än appens eget UI. Egen fråga. |

### KL Studio

| Fil:rad | Innehåll | Åtgärd |
|---|---|---|
| `src/index.css:9–15` | `@font-face` för Playfair Display från `fonts.gstatic.com` | **Ta bort.** |
| `src/index.css:23` | `--font-display: "Playfair Display", ui-serif, Georgia, serif;` | Peka om till `var(--nxt-font-display)`. |
| `src/index.css:21` | `--font-sans: "Sora", "Inter", …` | Ta bort `"Inter"` ur kedjan när Inter slutar laddas (nästa rad). |
| `src/index.css:227, 237, 247, 257` | `--serif: 'Cormorant Garamond', Georgia, serif;` ×4 | Peka om till `var(--nxt-font-sans)`. |
| `src/index.css:228, 238, 248, 258` | `--sans: 'DM Sans', system-ui, sans-serif;` ×4 | Peka om till `var(--nxt-font-sans)`. |
| `src/styles/globals.css:1` | `@import url('…fonts.googleapis.com…Inter…')` | **Ta bort.** |
| `index.html:22` | `<link>` som laddar Cormorant + Fraunces + Playfair + DM Sans + Inter | **Ta bort.** Fem familjer, noll kvar efter omställningen. |
| `index.html:20–21` | `preconnect` mot googleapis/gstatic | **Ta bort** — inget kvar att förbinda mot. |

Efter detta har KL noll externa typsnittsberoenden. Det är en sidovinst utöver
utseendet: fem familjer som hämtas från tredje part försvinner ur laddvägen.

### Inloggningssidorna

`kl-studio/src/pages/Login.tsx` och `wise-assist-ai/src/pages/Auth.tsx` har noll
`nxt-`-referenser och använder shadcns semantiska klasser. De ärver `html`-
familjen efter den här ändringen — men färg och layout förblir shadcn-paletten.
Egen leverans. wises inloggning säger dessutom fortfarande **"Kursstöd AI"**
i stället för "NXT Assist".

## 5. Ordning

1. Granska och tagga detta (familjelagret).
2. Lägg till Sora 500 — annars renderas 402 `font-medium` som 400.
3. Apparna, en i taget. wise först: en rad borttagen ger störst effekt.
4. Skalelagret (`feat/ui-typskala`) som egen leverans därefter.
