import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@glass-ui-kit/glass"

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="w-full max-w-md mx-auto space-y-2">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Frontend</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          React, TypeScript, and Tailwind CSS. Components are copy-paste friendly and follow the
          glassmorphism design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Backend</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Node.js with Express or Fastify. Database layer uses Prisma for type-safe queries.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>DevOps</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Docker for containerization, GitHub Actions for CI/CD, and Vercel for deployment.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
