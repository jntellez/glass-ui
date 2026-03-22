import ButtonDefault from "./button/button-default";
import buttonDefaultCode from "./button/button-default.tsx?raw";

import ButtonGlass from "./button/button-glass";
import buttonGlassCode from "./button/button-glass.tsx?raw";

import ButtonGlassSoft from "./button/button-glass-soft";
import buttonGlassSoftCode from "./button/button-glass-soft.tsx?raw";

import ButtonGlassStrong from "./button/button-glass-strong";
import buttonGlassStrongCode from "./button/button-glass-strong.tsx?raw";

import ButtonDisabled from "./button/button-disabled";
import buttonDisabledCode from "./button/button-disabled.tsx?raw";

import ButtonCombinations from "./button/button-combinations";
import buttonCombinationsCode from "./button/button-combinations.tsx?raw";

export const examples = {
  "button-default": {
    component: ButtonDefault,
    code: buttonDefaultCode,
  },
  "button-glass": {
    component: ButtonGlass,
    code: buttonGlassCode,
  },
  "button-glass-soft": {
    component: ButtonGlassSoft,
    code: buttonGlassSoftCode,
  },
  "button-glass-strong": {
    component: ButtonGlassStrong,
    code: buttonGlassStrongCode,
  },
  "button-disabled": {
    component: ButtonDisabled,
    code: buttonDisabledCode,
  },
  "button-combinations": {
    component: ButtonCombinations,
    code: buttonCombinationsCode,
  },
} as const;

export type ExampleName = keyof typeof examples;
