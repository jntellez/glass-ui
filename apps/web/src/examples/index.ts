import ButtonDemo from "./button/button-demo";
import buttonDemoCode from "./button/button-demo.tsx?raw";

import ButtonSizes from "./button/button-sizes";
import buttonSizesCode from "./button/button-sizes.tsx?raw";

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

import Buttonicon from "./button/button-icon";
import buttoniconCode from "./button/button-icon.tsx?raw";

import ButtonWithIcon from "./button/button-with-icon";
import buttonWithIconCode from "./button/button-with-icon.tsx?raw";

import ButtonSpinner from "./button/button-spinner";
import buttonSpinnerCode from "./button/button-spinner.tsx?raw";

import BadgeDemo from "./badge/badge-demo";
import badgeDemoCode from "./badge/badge-demo.tsx?raw";

import BadgeWeights from "./badge/badge-weights";
import badgeWeightsCode from "./badge/badge-weights.tsx?raw";

import BadgeIcon from "./badge/badge-icon";
import badgeIconCode from "./badge/badge-icon.tsx?raw";

import BadgeLink from "./badge/badge-link";
import badgeLinkCode from "./badge/badge-link.tsx?raw";

import BadgeCustomColors from "./badge/badge-custom-colors";
import badgeCustomColorsCode from "./badge/badge-custom-colors.tsx?raw";

import BadgeSpinner from "./badge/badge-spinner";
import badgeSpinnerCode from "./badge/badge-spinner.tsx?raw";

export const examples = {
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
  "badge-demo": {
    component: BadgeDemo,
    code: badgeDemoCode,
  },
  "badge-weights": {
    component: BadgeWeights,
    code: badgeWeightsCode,
  },
  "badge-icon": {
    component: BadgeIcon,
    code: badgeIconCode,
  },
  "badge-link": {
    component: BadgeLink,
    code: badgeLinkCode,
  },
  "badge-custom-colors": {
    component: BadgeCustomColors,
    code: badgeCustomColorsCode,
  },
  "badge-spinner": {
    component: BadgeSpinner,
    code: badgeSpinnerCode,
  },
} as const;

export type ExampleName = keyof typeof examples;
