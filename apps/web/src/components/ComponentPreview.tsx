import { registry, type ComponentName } from "../registry/index";

interface ComponentPreviewProps {
  name: ComponentName;
}

export default function ComponentPreview({ name }: ComponentPreviewProps) {
  const Preview = registry[name];

  if (!Preview) {
    return (
      <p className="text-red-400">
        Component "{name}" not found in the registry.
      </p>
    );
  }

  return (
    <div className="not-content my-6 flex flex-col gap-4">
      <div className="preview-container relative rounded-xl border border-white/20 bg-black/10 p-4 backdrop-blur-md">
        <Preview />
      </div>
    </div>
  );
}