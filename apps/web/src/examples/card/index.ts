import CardDemo from "./card-demo";
import cardDemoCode from "./card-demo.tsx?raw";

import CardDefault from "./card-default";
import cardDefaultCode from "./card-default.tsx?raw";

import CardSoft from "./card-soft";
import cardSoftCode from "./card-soft.tsx?raw";

import CardStrong from "./card-strong";
import cardStrongCode from "./card-strong.tsx?raw";

import CardInteractive from "./card-interactive";
import cardInteractiveCode from "./card-interactive.tsx?raw";

export const cardExamples = {
  "card-demo": {
    component: CardDemo,
    code: cardDemoCode,
  },
  "card-default": {
    component: CardDefault,
    code: cardDefaultCode,
  },
  "card-soft": {
    component: CardSoft,
    code: cardSoftCode,
  },
  "card-strong": {
    component: CardStrong,
    code: cardStrongCode,
  },
  "card-interactive": {
    component: CardInteractive,
    code: cardInteractiveCode,
  },
} as const;
