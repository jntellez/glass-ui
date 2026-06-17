import { accordionExamples } from "./accordion"
import { badgeExamples } from "./badge"
import { buttonExamples } from "./button"
import { checkboxExamples } from "./checkbox"
import { cardExamples } from "./card"
import { fieldExamples } from "./field"
import { inputExamples } from "./input"
import { labelExamples } from "./label"
import { nativeSelectExamples } from "./native-select"
import { selectExamples } from "./select"
import { tabsExamples } from "./tabs"
import { textareaExamples } from "./textarea"

export const examples = {
  ...accordionExamples,
  ...badgeExamples,
  ...buttonExamples,
  ...checkboxExamples,
  ...cardExamples,
  ...fieldExamples,
  ...inputExamples,
  ...labelExamples,
  ...nativeSelectExamples,
  ...selectExamples,
  ...tabsExamples,
  ...textareaExamples,
} as const

export type ExampleName = keyof typeof examples
