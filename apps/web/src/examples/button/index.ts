import ButtonDemo from "./button-demo";
import buttonDemoCode from "./button-demo.tsx?raw";

import ButtonSizes from "./button-sizes";
import buttonSizesCode from "./button-sizes.tsx?raw";

import ButtonDefault from "./button-default";
import buttonDefaultCode from "./button-default.tsx?raw";

import ButtonGlass from "./button-glass";
import buttonGlassCode from "./button-glass.tsx?raw";

import ButtonGlassSoft from "./button-glass-soft";
import buttonGlassSoftCode from "./button-glass-soft.tsx?raw";

import ButtonGlassStrong from "./button-glass-strong";
import buttonGlassStrongCode from "./button-glass-strong.tsx?raw";

import ButtonDisabled from "./button-disabled";
import buttonDisabledCode from "./button-disabled.tsx?raw";

import ButtonCombinations from "./button-combinations";
import buttonCombinationsCode from "./button-combinations.tsx?raw";

import Buttonicon from "./button-icon";
import buttoniconCode from "./button-icon.tsx?raw";

import ButtonWithIcon from "./button-with-icon";
import buttonWithIconCode from "./button-with-icon.tsx?raw";

import ButtonSpinner from "./button-spinner";
import buttonSpinnerCode from "./button-spinner.tsx?raw";

export const buttonExamples = {
  "button-demo": {
    component: ButtonDemo,
    code: buttonDemoCode,
  },
  "button-sizes": {
    component: ButtonSizes,
    code: buttonSizesCode,
  },
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
  "button-icon": {
    component: Buttonicon,
    code: buttoniconCode,
  },
  "button-with-icon": {
    component: ButtonWithIcon,
    code: buttonWithIconCode,
  },
  "button-spinner": {
    component: ButtonSpinner,
    code: buttonSpinnerCode,
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
