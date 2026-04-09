import * as React from "react"
import { Badge, Button, Card, Input } from "@glass-ui-kit/glass"
import type { TokenValues } from "./customization-tokens"

export type PreviewSceneId = "overview" | "components" | "content"

interface PreviewSceneRenderProps {
  values: TokenValues
  previewMode: "light" | "dark"
}

export interface PreviewSceneDefinition {
  id: PreviewSceneId
  label: string
  panelLabel: string
  title: string
  description: string
  render: (props: PreviewSceneRenderProps) => React.ReactNode
}

function PreviewSample({
  name,
  title,
  surfaceClassName,
  background,
  border,
  blur,
  accent,
  accentForeground,
}: {
  name: string
  title: string
  surfaceClassName?: string
  background: string
  border: string
  blur: string
  accent: string
  accentForeground: string
}) {
  return (
    <article aria-label={name} className="space-y-3">
      <Card className={surfaceClassName ? `space-y-4 p-4 ${surfaceClassName}` : "space-y-4 p-4"}>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Local preview tokens update immediately.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            aria-label={`${name} search`}
            placeholder={`${title} input`}
            className="glass glass-soft"
          />
          <Button
            className="glass glass-strong"
            style={{ backgroundColor: accent, color: accentForeground }}
          >
            {`Apply ${title.toLowerCase()}`}
          </Button>
        </div>
        <Badge style={{ backgroundColor: accent, color: accentForeground }}>Accent emphasis</Badge>
        <dl className="grid gap-2 text-sm text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Background</dt>
            <dd>
              {`Background ${background}`}
              <span className="sr-only">{background}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Border</dt>
            <dd>
              {`Border ${border}`}
              <span className="sr-only">{border}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Blur</dt>
            <dd>
              {`Blur ${blur}`}
              <span className="sr-only">{blur}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Accent</dt>
            <dd>
              {`Accent ${accent}`}
              <span className="sr-only">{accent}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Accent foreground</dt>
            <dd>
              {`Accent foreground ${accentForeground}`}
              <span className="sr-only">{accentForeground}</span>
            </dd>
          </div>
        </dl>
      </Card>
    </article>
  )
}

export const PREVIEW_SCENES: readonly PreviewSceneDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    panelLabel: "Overview scene",
    title: "Workspace overview",
    description: "Compare dashboard cards, primary actions, and dense stats before exporting CSS.",
    render: ({ previewMode }) => (
      <Card className="space-y-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Local tool-only theme</p>
            <h3 className="text-xl font-semibold text-foreground">Revenue snapshot</h3>
            <p className="text-sm text-muted-foreground">
              {`Representative Glass UI surfaces update immediately as you edit ${previewMode} tokens.`}
            </p>
          </div>
          <Button className="glass">Share preview</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="glass-soft space-y-1 p-4">
            <p className="text-sm text-muted-foreground">MRR</p>
            <p className="text-2xl font-semibold text-foreground">$48.2k</p>
          </Card>
          <Card className="space-y-1 p-4">
            <p className="text-sm text-muted-foreground">Conversion</p>
            <p className="text-2xl font-semibold text-foreground">18.4%</p>
          </Card>
          <Card className="glass-strong space-y-1 p-4">
            <p className="text-sm text-muted-foreground">Latency</p>
            <p className="text-2xl font-semibold text-foreground">142ms</p>
          </Card>
        </div>
      </Card>
    ),
  },
  {
    id: "components",
    label: "Components",
    panelLabel: "Components scene",
    title: "Component surfaces",
    description:
      "Inspect interactive controls, density, and glass treatments with the active tokens.",
    render: () => (
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Team inbox</h3>
            <p className="text-sm text-muted-foreground">
              Search and action surfaces use the active preview tokens.
            </p>
          </div>
          <Input
            aria-label="Search preview surfaces"
            placeholder="Search preview surfaces"
            className="glass glass-soft"
          />
          <div className="flex flex-wrap gap-2">
            <Badge className="glass">Glass</Badge>
            <Badge className="glass glass-strong">Strong</Badge>
            <Badge className="glass glass-soft">Soft</Badge>
          </div>
          <Button className="glass glass-strong">Publish changes</Button>
        </Card>

        <Card className="glass-soft space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Command palette</h3>
            <p className="text-sm text-muted-foreground">
              Dense controls stay readable while glass surfaces shift with live tokens.
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Inspect button contrast and surface depth.</p>
            <p>• Compare default, soft, and strong treatments side-by-side.</p>
          </div>
        </Card>
      </div>
    ),
  },
  {
    id: "content",
    label: "Content",
    panelLabel: "Content scene",
    title: "Content density",
    description: "Review stacked reading surfaces and token summaries without leaving the editor.",
    render: ({ values }) => (
      <div className="space-y-4">
        <Card className="glass-soft space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Weekly sync notes</h3>
            <p className="text-sm text-muted-foreground">
              Keep the richer canvas representative without changing the site theme.
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Confirm base glass, strong, and soft surfaces side-by-side.</p>
            <p>• Check buttons, inputs, and badges against the active token set.</p>
          </div>
        </Card>

        <PreviewSample
          name="Default sample"
          title="Default sample"
          background={values["--glass-bg"]}
          border={values["--glass-border"]}
          blur={values["--glass-blur"]}
          accent={values["--accent"]}
          accentForeground={values["--accent-foreground"]}
        />
        <PreviewSample
          name="Soft sample"
          title="Soft sample"
          surfaceClassName="glass-soft"
          background={values["--glass-bg-soft"]}
          border={values["--glass-border-soft"]}
          blur={values["--glass-blur-soft"]}
          accent={values["--accent"]}
          accentForeground={values["--accent-foreground"]}
        />
        <PreviewSample
          name="Strong sample"
          title="Strong sample"
          surfaceClassName="glass-strong"
          background={values["--glass-bg-strong"]}
          border={values["--glass-border-strong"]}
          blur={values["--glass-blur-strong"]}
          accent={values["--accent"]}
          accentForeground={values["--accent-foreground"]}
        />
      </div>
    ),
  },
]
