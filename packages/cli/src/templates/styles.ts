export const GLASS_BASE_STYLES = `
@layer base {
  :root {
    /* === Glass UI Tokens (Default) === */
    --glass-bg: rgba(255, 255, 255, 0.4);
    --glass-border: rgba(255, 255, 255, 0.5);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    --glass-blur: 12px;
    --glass-saturation: 110%;

    /* === Intensity Variants === */
    --glass-bg-strong: rgba(255, 255, 255, 0.75);
    --glass-border-strong: rgba(255, 255, 255, 0.8);
    --glass-blur-strong: 20px;

    --glass-bg-soft: rgba(255, 255, 255, 0.2);
    --glass-border-soft: rgba(255, 255, 255, 0.3);
    --glass-blur-soft: 8px;
  }

  .dark {
    /* === Glass UI Tokens (Dark) === */
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);

    --glass-bg-strong: rgba(15, 23, 42, 0.85);
    --glass-border-strong: rgba(255, 255, 255, 0.15);
    
    --glass-bg-soft: rgba(15, 23, 42, 0.3);
    --glass-border-soft: rgba(255, 255, 255, 0.05);
  }
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
