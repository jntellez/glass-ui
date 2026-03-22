import { Button } from "@glass-ui-kit/glass";

export default function ButtonDisabled() {
  return (
    <div className="flex items-center justify-center p-4">
      <Button className="glass" disabled>
        Disabled Action
      </Button>
    </div>
  );
}