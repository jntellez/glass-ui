export const CUSTOMIZATION_PAGE_TITLE = "Customization editor - Glass UI"
export const CUSTOMIZATION_PAGE_DESCRIPTION =
  "Tune the canonical glass tokens, preview them locally, and export deterministic CSS."

export function getCustomizationPageA11yProps() {
  return {
    headingId: "customization-title",
    descriptionId: "customization-description",
    labelledBy: "customization-title",
    describedBy: "customization-description",
  }
}

export function getCustomizationPageSectionClassName(extraClassName = "") {
  return ["flex min-h-[calc(100vh-8rem)] w-full flex-1 flex-col py-4 md:py-6", extraClassName]
    .filter(Boolean)
    .join(" ")
}
