import { accordionExamples } from "./accordion"
import { badgeExamples } from "./badge"
import { buttonExamples } from "./button"
import { checkboxExamples } from "./checkbox"
import { cardExamples } from "./card"
import { collapsibleExamples } from "./collapsible"
import { colorPickerExamples } from "./color-picker"
import { dialogExamples } from "./dialog"
import { dropdownMenuExamples } from "./dropdown-menu"
import { fieldExamples } from "./field"
import { inputExamples } from "./input"
import { labelExamples } from "./label"
import { nativeSelectExamples } from "./native-select"
import { popoverExamples } from "./popover"
import { radioGroupExamples } from "./radio-group"
import { selectExamples } from "./select"
import { separatorExamples } from "./separator"
import { sliderExamples } from "./slider"
import { switchExamples } from "./switch"
import { tabsExamples } from "./tabs"
import { textareaExamples } from "./textarea"
import { tooltipExamples } from "./tooltip"

export const examples = {
  ...accordionExamples,
  ...badgeExamples,
  ...buttonExamples,
  ...checkboxExamples,
  ...cardExamples,
  ...collapsibleExamples,
  ...colorPickerExamples,
  ...dialogExamples,
  ...dropdownMenuExamples,
  ...fieldExamples,
  ...inputExamples,
  ...labelExamples,
  ...nativeSelectExamples,
  ...popoverExamples,
  ...radioGroupExamples,
  ...selectExamples,
  ...separatorExamples,
  ...sliderExamples,
  ...switchExamples,
  ...tabsExamples,
  ...textareaExamples,
  ...tooltipExamples,
} as const

export type ExampleName = keyof typeof examples
