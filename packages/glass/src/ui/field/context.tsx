import * as React from "react"

type FieldContextValue = {
  invalid: boolean
  defaultControlId: string
  controlId: string | null
  defaultLabelId: string
  labelId: string | null
  defaultDescriptionId: string
  descriptionId: string | null
  defaultErrorId: string
  errorId: string | null
  setLabelId: (id: string | null) => void
  setControlId: (id: string | null) => void
  setDescriptionId: (id: string | null) => void
  setErrorId: (id: string | null) => void
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function sanitizeId(id: string) {
  return id.replace(/:/g, "")
}

function mergeAriaDescribedBy(...values: Array<string | null | undefined>) {
  const tokens = values
    .flatMap((value) => value?.split(/\s+/) ?? [])
    .map((value) => value.trim())
    .filter(Boolean)

  return tokens.length > 0 ? Array.from(new Set(tokens)).join(" ") : undefined
}

function useFieldContext() {
  return React.useContext(FieldContext)
}

function useFieldRegistration(
  register: ((id: string | null) => void) | undefined,
  id: string | undefined,
) {
  React.useEffect(() => {
    if (!register || !id) {
      return
    }

    register(id)

    return () => {
      register(null)
    }
  }, [id, register])
}

export { FieldContext, mergeAriaDescribedBy, sanitizeId, useFieldContext, useFieldRegistration }
