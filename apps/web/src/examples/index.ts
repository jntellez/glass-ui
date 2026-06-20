import { accordionExamples } from "./accordion"
import { badgeExamples } from "./badge"
import { buttonExamples } from "./button"
import { checkboxExamples } from "./checkbox"
import { cardExamples } from "./card"
import { collapsibleExamples } from "./collapsible"
import { colorPickerExamples } from "./color-picker"
import { dropdownMenuExamples } from "./dropdown-menu"
import { fieldExamples } from "./field"
import { inputExamples } from "./input"
import { labelExamples } from "./label"
import { nativeSelectExamples } from "./native-select"
import { popoverExamples } from "./popover"
import { selectExamples } from "./select"
import { sliderExamples } from "./slider"
import { tabsExamples } from "./tabs"
import { textareaExamples } from "./textarea"

export const examples = {
  ...accordionExamples,
  ...badgeExamples,
  ...buttonExamples,
  ...checkboxExamples,
  ...cardExamples,
  ...collapsibleExamples,
  ...colorPickerExamples,
  ...dropdownMenuExamples,
  ...fieldExamples,
  ...inputExamples,
  ...labelExamples,
  ...nativeSelectExamples,
  ...popoverExamples,
  ...selectExamples,
  ...sliderExamples,
  ...tabsExamples,
  ...textareaExamples,
} as const

export type ExampleName = keyof typeof examples
