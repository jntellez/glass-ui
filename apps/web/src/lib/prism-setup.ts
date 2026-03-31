import { Prism } from "prism-react-renderer";

if (typeof global !== "undefined") {
  (global as any).Prism = Prism;
} else if (typeof window !== "undefined") {
  (window as any).Prism = Prism;
}

Prism.languages.astro = {
  frontmatter: {
    pattern: /^---[\s\S]*?---/,
    greedy: true,
    inside: {
      punctuation: /^---|---$/,
      "language-typescript": {
        pattern: /(^---)[\s\S]+(?=---$)/,
        lookbehind: true,
        inside: Prism.languages.typescript || Prism.languages.javascript,
      },
    },
  },
  ...Prism.languages.tsx,
};

Prism.languages.astrojs = Prism.languages.astro;
