import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@glass-ui-kit/glass"

export default function AccordionDisabled() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md mx-auto space-y-2">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Available section</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>This section is fully interactive and can be expanded.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionHeader>
          <AccordionTrigger>Disabled section</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          This content is never visible because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Another available section</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          This section works normally regardless of the disabled sibling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
