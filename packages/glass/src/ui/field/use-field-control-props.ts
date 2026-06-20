import * as React from "react"
import { mergeAriaDescribedBy, useFieldContext, useFieldRegistration } from "./context"

type ControlProps = {
  id?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
}

function useFieldControlProps<T extends ControlProps>(props: T) {
  const field = useFieldContext()
  const id = props.id ?? field?.defaultControlId

  useFieldRegistration(field?.setControlId, id)

  const ariaDescribedBy = React.useMemo(() => {
    if (!field) {
      return props["aria-describedby"]
    }

    return mergeAriaDescribedBy(props["aria-describedby"], field.descriptionId, field.errorId)
  }, [field, props])

  const ariaLabelledBy = React.useMemo(() => {
    if (props["aria-label"] || props["aria-labelledby"]) {
      return props["aria-labelledby"]
    }

    return field?.labelId ?? field?.defaultLabelId
  }, [field?.defaultLabelId, field?.labelId, props])

  const ariaInvalid = props["aria-invalid"] ?? (field?.invalid ? true : undefined)

  return {
    id,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
  }
}

export { useFieldControlProps }
