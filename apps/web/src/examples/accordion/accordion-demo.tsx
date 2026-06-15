import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@glass-ui-kit/glass"

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md mx-auto space-y-2">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and supports full keyboard navigation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Is it styled?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Yes. It comes with a glassmorphism design that matches the rest of the design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Is it animated?</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Yes. The content height animates on open and close for a smooth transition.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
