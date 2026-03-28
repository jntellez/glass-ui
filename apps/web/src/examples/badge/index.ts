import BadgeDemo from "./badge-demo";
import badgeDemoCode from "./badge-demo.tsx?raw";

import BadgeWeights from "./badge-weights";
import badgeWeightsCode from "./badge-weights.tsx?raw";

import BadgeIcon from "./badge-icon";
import badgeIconCode from "./badge-icon.tsx?raw";

import BadgeLink from "./badge-link";
import badgeLinkCode from "./badge-link.tsx?raw";

import BadgeCustomColors from "./badge-custom-colors";
import badgeCustomColorsCode from "./badge-custom-colors.tsx?raw";

import BadgeSpinner from "./badge-spinner";
import badgeSpinnerCode from "./badge-spinner.tsx?raw";

export const badgeExamples = {
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
