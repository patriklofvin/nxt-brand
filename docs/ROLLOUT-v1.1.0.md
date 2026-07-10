# Utrullning — @nxt/brand v1.1.0

**Tagg:** `v1.1.0` · **Beslutsdatum statuspalett:** 2026-07-10
**Källa till sanning:** NXT Brand Book v1.0 (2026)

Så här använder respektive CC-session detta dokument:

> "Läs `docs/ROLLOUT-v1.1.0.md` i nxt-brand-repot (`github:patriklofvin/nxt-brand`) och utför din repo-rad."

---

## 1. Vad v1.1.0 tillför

Additivt, inga brytande ändringar mot v1.0.x.

- **Semantisk statuspalett** (`css/nxt-tokens.css`, `:root`, efter modulfärgerna):
  - `--nxt-error: #C0392B`
  - `--nxt-warning: #B0822F`
  - `--nxt-success: #3F9466`
  - `--nxt-info: #7E5A96`
  - Regel: status kommuniceras **alltid** färg **+ ikon + text** (WCAG 1.4.1 — aldrig enbart färg).
- **Generiska accent-tinter** som följer aktiv `--nxt-accent`:
  - `--nxt-accent-50: color-mix(in srgb, var(--nxt-accent) 8%, white)`
  - `--nxt-accent-100: color-mix(in srgb, var(--nxt-accent) 16%, white)`
- **Tailwind-preset** exponerar motsvarande nycklar (alla via `var()`):
  `nxt.error`, `nxt.warning`, `nxt.success`, `nxt.info`, `nxt.accent-50`, `nxt.accent-100`.

---

## 2. Relay-rader per repo

### Generell bump-instruktion (repos som redan kör v1.0.1)

I `package.json`: bumpa
`"@nxt/brand": "github:patriklofvin/nxt-brand#v1.0.1"` → `#v1.1.0`,
kör `npm i`, committa.

| Repo | Branch | Utöver bumpen |
|---|---|---|
| `wise-assist-ai` | `feat/cr-brand-1` | Uppdatera avvikelse-noteringen till **"info = `--nxt-info` (beslutad palett)"**. |
| `kommun-compliance-hub` | `feat/cr-brand-3` | Mappa `brand.50/100` → `--nxt-accent-50/100`, och **stryk tint-raden** ur "Kända avvikelser". |

---

## 3. Repos som ännu inte installerat v1.0.1

**KL Studio (`klicka-lar-studio`)** och **`ahrant-platform`** har inte hunnit
installera v1.0.1 än. De bumpas därför **inte** separat — de installerar
`#v1.1.0` **direkt vid sina CR-implementationer** (CR-BRAND-2/4/5/7 respektive
CR-BRAND-4/6). Ingen mellanliggande v1.0.1-bump behövs.

---

## Installation (referens)

```bash
npm i github:patriklofvin/nxt-brand#v1.1.0
```

Verifierat: installerat paket rapporterar `1.1.0`, nya tokens följer med i
`css/nxt-tokens.css`, och preseten exponerar de sex nya nycklarna.
