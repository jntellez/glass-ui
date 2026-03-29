import { Card } from "@glass-ui-kit/glass";

export default function RequirementsCard() {
  return (
    <Card className="p-4">
      <h3 className="text-base font-medium text-foreground mb-2 mt-0">Requirements</h3>
      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2 mb-0 mt-0 marker:text-muted-foreground/50">
        <li>
          An existing project configured with <strong>React 18</strong> or later.
        </li>
        <li>
          <strong>Tailwind CSS v4</strong> for styling and CSS-first theming.
        </li>
        <li>
          <strong>TypeScript</strong> (highly recommended to take full advantage of our typed props and variants).
        </li>
      </ul>
    </Card>
  );
}