import { badgeExamples } from "./badge";
import { buttonExamples } from "./button";
import { cardExamples } from "./card";

export const examples = {
  ...badgeExamples,
  ...buttonExamples,
  ...cardExamples,
} as const;

export type ExampleName = keyof typeof examples;
