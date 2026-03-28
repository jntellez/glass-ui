import { badgeExamples } from "./badge";
import { buttonExamples } from "./button";
import { cardExamples } from "./card";
import { inputExamples } from "./input";

export const examples = {
  ...badgeExamples,
  ...buttonExamples,
  ...cardExamples,
  ...inputExamples,
} as const;

export type ExampleName = keyof typeof examples;
