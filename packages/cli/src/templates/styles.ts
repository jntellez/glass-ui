// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// Run 'pnpm run sync' to update this content.

export const GLASS_BASE_STYLES = `
@layer base {
  :root {
    /* === TEXT TOKENS (Light) === */
    --foreground: #18181b;
    --muted-foreground: #3f3f46;
    --accent: #3f3f46;
    --accent-foreground: #ffffff;
    --destructive: #dc2626;
    --destructive-foreground: #ffffff;

    /* === BASE PRIMITIVES (Default) === */
    --glass-bg: rgba(255, 255, 255, 0.35);
    --glass-border: rgba(255, 255, 255, 0.6);
    --glass-shadow: var(--glass-shadow-sm);
    --glass-blur: 6px;

    /* === SHADOW SIZES === */
    --glass-shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
    --glass-shadow-md: 0 4px 30px 0 rgba(0, 0, 0, 0.1);
    --glass-shadow-lg: 0 8px 40px 0 rgba(0, 0, 0, 0.2);

    /* === BORDER RADIUS === */
    --glass-radius-sm: 0.375rem;
    --glass-radius-md: 0.75rem;
    --glass-radius-lg: 1rem;
    --glass-radius-xl: 1.5rem;

    /* === SEMANTIC VARIANTS === */
    --glass-bg-strong: rgba(255, 255, 255, 0.5);
    --glass-border-strong: rgba(255, 255, 255, 0.8);
    --glass-blur-strong: 10px;

    --glass-bg-soft: rgba(255, 255, 255, 0.2);
    --glass-border-soft: rgba(255, 255, 255, 0.4);
    --glass-blur-soft: 2px;
  }

  .dark {
    /* === TEXT TOKENS (Dark) === */
    --foreground: #fafafa;
    --muted-foreground: #d4d4d8;
    --accent: #d4d4d8;
    --accent-foreground: #18181b;
    --destructive: #f87171;
    --destructive-foreground: #18181b;

    /* === DARK PRIMITIVES === */
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-shadow: var(--glass-shadow-sm);

    /* === DARK SHADOW SIZES === */
    --glass-shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    --glass-shadow-md: 0 4px 30px 0 rgba(0, 0, 0, 0.2);
    --glass-shadow-lg: 0 8px 40px 0 rgba(0, 0, 0, 0.35);

    /* === DARK VARIANTS === */
    --glass-bg-strong: rgba(255, 255, 255, 0.15);
    --glass-border-strong: rgba(255, 255, 255, 0.2);

    --glass-bg-soft: rgba(255, 255, 255, 0.03);
    --glass-border-soft: rgba(255, 255, 255, 0.06);
  }
}

@theme {
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
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

/* --- Global Utilities Injected by Glass UI --- */

/* Hide native reveal icons in password inputs */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

/* Provisional gradient background to highlight Glassmorphism */
body {
  /* Pastel gradient for light mode */
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  background-attachment: fixed;
  color: var(--foreground);
  min-height: 100vh;
}

.dark body {
  /* Deep gradient for dark mode */
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  background-attachment: fixed;
  color: var(--foreground);
}

@utility glass {
  background-color: var(--glass-bg);
  border-width: 1px;
  border-style: solid;
  border-color: var(--glass-border);
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow);
}

@utility glass-strong {
  --glass-bg: var(--glass-bg-strong);
  --glass-border: var(--glass-border-strong);
  --glass-blur: var(--glass-blur-strong);
}

@utility glass-soft {
  --glass-bg: var(--glass-bg-soft);
  --glass-border: var(--glass-border-soft);
  --glass-blur: var(--glass-blur-soft);
}
`
