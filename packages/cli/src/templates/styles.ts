export const GLASS_BASE_STYLES = `
/* === Glass UI – Design Tokens === */
@layer base {
  :root {
    /* === BASE PRIMITIVES (Default) === */
    --glass-bg: rgba(255, 255, 255, 0.4);
    --glass-border: rgba(255, 255, 255, 0.5);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    --glass-blur: 12px;
    --glass-saturation: 110%;

    /* === SHADOW SIZES === */
    --glass-shadow-sm: 0 2px 8px 0 rgba(31, 38, 135, 0.08);
    --glass-shadow-md: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    --glass-shadow-lg: 0 16px 48px 0 rgba(31, 38, 135, 0.25);

    /* === BORDER RADIUS === */
    --glass-radius-sm: 0.375rem;
    --glass-radius-md: 0.75rem;
    --glass-radius-lg: 1rem;
    --glass-radius-xl: 1.5rem;

    /* === SEMANTIC VARIANTS (Tokens) === */
    /* Strong: Para alto contraste o énfasis */
    --glass-bg-strong: rgba(255, 255, 255, 0.75);
    --glass-border-strong: rgba(255, 255, 255, 0.8);
    --glass-blur-strong: 20px;

    /* Soft: Para fondos sutiles */
    --glass-bg-soft: rgba(255, 255, 255, 0.2);
    --glass-border-soft: rgba(255, 255, 255, 0.3);
    --glass-blur-soft: 8px;
  }

  .dark {
    /* === DARK PRIMITIVES === */
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);

    /* === DARK SHADOW SIZES === */
    --glass-shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    --glass-shadow-md: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
    --glass-shadow-lg: 0 16px 48px 0 rgba(0, 0, 0, 0.5);

    /* === DARK VARIANTS === */
    --glass-bg-strong: rgba(15, 23, 42, 0.85);
    --glass-border-strong: rgba(255, 255, 255, 0.15);

    --glass-bg-soft: rgba(15, 23, 42, 0.3);
    --glass-border-soft: rgba(255, 255, 255, 0.05);
  }
}

/* === Glass UI – Tailwind v4 Theme Mapping === */
@theme {
  --color-glass-bg: var(--glass-bg);
  --color-glass-border: var(--glass-border);
  --shadow-glass: var(--glass-shadow);
  --shadow-glass-sm: var(--glass-shadow-sm);
  --shadow-glass-md: var(--glass-shadow-md);
  --shadow-glass-lg: var(--glass-shadow-lg);
  --backdrop-blur-glass: var(--glass-blur);
  --radius-glass-sm: var(--glass-radius-sm);
  --radius-glass-md: var(--glass-radius-md);
  --radius-glass-lg: var(--glass-radius-lg);
  --radius-glass-xl: var(--glass-radius-xl);
}

@layer components {
  /* La clase base obligatoria */
  .glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
    box-shadow: var(--glass-shadow);
  }

  /* Variantes semánticas (solo reasignan variables) */
  .glass-strong {
    --glass-bg: var(--glass-bg-strong);
    --glass-border: var(--glass-border-strong);
    --glass-blur: var(--glass-blur-strong);
  }

  .glass-soft {
    --glass-bg: var(--glass-bg-soft);
    --glass-border: var(--glass-border-soft);
    --glass-blur: var(--glass-blur-soft);
  }
}
`;
