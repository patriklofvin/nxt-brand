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
          // Neutralskala: ink-soft = sekundärtext (4,62:1 mot papper),
          // line = avdelare/ramar (aldrig text).
          'ink-soft': 'var(--nxt-ink-soft)',
          line: 'var(--nxt-line)',
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
      /**
       * Presetet är en ADAPTER, inte en andra källa.
       *
       * Värdena bodde tidigare här som literaler. Då fanns skalan på två
       * ställen — i CSS-variablerna och i den här filen — och bara Tailwind v3
       * kunde läsa den. KL kör v4 (CSS-first `@theme`) och når aldrig hit.
       *
       * Nu pekar varje nyckel på samma custom property som `nxt-tokens.css`
       * definierar. v3 hämtar dem genom presetet, v4 genom `@theme`, och båda
       * läser EN definition. Ändras en grad ändras den på ett ställe.
       *
       * VIKTIGT vid uppgradering: xs–3xl ÖVERSTYR Tailwinds egen skala för
       * alla v3-konsumenter. Det är avsikten — det är så en app slipper
       * underhålla ett eget register — men en app som i dag lutar sig mot
       * Tailwinds default får nya grader enbart av att flytta pinnen.
       * Se ROLLOUT-v1.5.0.md.
       */
      fontSize: {
        // UI-register (NXT Assist-skalan, 14px bas)
        xs: ['var(--nxt-text-xs)', { lineHeight: 'var(--nxt-leading-xs)' }],
        sm: ['var(--nxt-text-sm)', { lineHeight: 'var(--nxt-leading-sm)' }],
        base: ['var(--nxt-text-base)', { lineHeight: 'var(--nxt-leading-base)' }],
        lg: ['var(--nxt-text-lg)', { lineHeight: 'var(--nxt-leading-lg)' }],
        xl: ['var(--nxt-text-xl)', { lineHeight: 'var(--nxt-leading-xl)' }],
        '2xl': ['var(--nxt-text-2xl)', { lineHeight: 'var(--nxt-leading-2xl)' }],
        '3xl': ['var(--nxt-text-3xl)', { lineHeight: 'var(--nxt-leading-3xl)' }],

        // Varumärkesgrader — ligger utanför registret, oförändrade värden
        'nxt-display': ['var(--nxt-text-display)', { lineHeight: 'var(--nxt-leading-display)', fontWeight: '700' }],
        'nxt-heading': ['var(--nxt-text-heading)', { lineHeight: 'var(--nxt-leading-heading)', fontWeight: '600' }],
        'nxt-body': ['var(--nxt-text-body)', { lineHeight: 'var(--nxt-leading-body)', fontWeight: '400' }],
        'nxt-label': ['var(--nxt-text-label)', { lineHeight: 'var(--nxt-leading-label)', fontWeight: '500', letterSpacing: '0.06em' }],
      },
    },
  },
};
