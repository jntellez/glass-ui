import { badgeExamples } from "./badge"
import { buttonExamples } from "./button"
import { checkboxExamples } from "./checkbox"
import { cardExamples } from "./card"
import { fieldExamples } from "./field"
import { inputExamples } from "./input"
import { labelExamples } from "./label"
import { selectExamples } from "./select"
import { textareaExamples } from "./textarea"

export const examples = {
  ...badgeExamples,
  ...buttonExamples,
  ...checkboxExamples,
  ...cardExamples,
  ...fieldExamples,
  ...inputExamples,
  ...labelExamples,
  ...selectExamples,
  ...textareaExamples,
} as const

export type ExampleName = keyof typeof examples
