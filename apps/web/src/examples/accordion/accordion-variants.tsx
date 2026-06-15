import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@glass-ui-kit/glass"

const variants = ["default", "soft", "strong"] as const

export default function AccordionVariants() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {variants.map((variant) => (
        <div key={variant}>
          <p className="text-sm font-medium mb-2 text-muted-foreground capitalize">{variant}</p>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" variant={variant}>
              <AccordionHeader>
                <AccordionTrigger>{variant} variant</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                This is the {variant} variant. Each item can have its own visual treatment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" variant={variant}>
              <AccordionHeader>
                <AccordionTrigger>Another item</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                Content for the second item in the {variant} variant.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  )
}
