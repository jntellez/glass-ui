import { badgeExamples } from "./badge"
import { buttonExamples } from "./button"
import { cardExamples } from "./card"
import { inputExamples } from "./input"
import { textareaExamples } from "./textarea"

export const examples = {
  ...badgeExamples,
  ...buttonExamples,
  ...cardExamples,
  ...inputExamples,
  ...textareaExamples,
} as const

export type ExampleName = keyof typeof examples
