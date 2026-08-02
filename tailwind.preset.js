/**
 * NXT Brand — Tailwind preset
 * Användning i konsumerande repo:
 *   // tailwind.config.ts
 *   presets: [require('@nxt/brand/tailwind.preset')]
 *
 * Färgerna pekar på CSS-variabler så att accent-scoping
 * (--nxt-accent per app/subtree) fungerar även i Tailwind-klasser.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        nxt: {
          violet: 'var(--nxt-violet)',
          ink: 'var(--nxt-ink)',
          paper: 'var(--nxt-paper)',
          accent: 'var(--nxt-accent)',
          learning: 'var(--nxt-learning)',
          studio: 'var(--nxt-studio)',
          compliance: 'var(--nxt-compliance)',
          assist: 'var(--nxt-assist)',
          test: 'var(--nxt-test)',
          lexicon: 'var(--nxt-lexicon)',
          docs: 'var(--nxt-docs)',
          // Strong-varianter: bär liten vit text (≥4,5:1). Yta och stora
          // grader = grundton, interaktiva små element = strong.
          'accent-strong': 'var(--nxt-accent-strong)',
          'studio-strong': 'var(--nxt-studio-strong)',
          'assist-strong': 'var(--nxt-assist-strong)',
          'test-strong': 'var(--nxt-test-strong)',
          'lexicon-strong': 'var(--nxt-lexicon-strong)',
          error: 'var(--nxt-error)',
          warning: 'var(--nxt-warning)',
          success: 'var(--nxt-success)',
          info: 'var(--nxt-info)',
          'accent-50': 'var(--nxt-accent-50)',
          'accent-100': 'var(--nxt-accent-100)',
        },
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'nxt-display': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'nxt-heading': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'nxt-body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'nxt-label': ['12px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.06em' }],
      },
    },
  },
};
