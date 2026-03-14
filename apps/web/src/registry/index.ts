import React from "react";
import ButtonDemo from "./demos/button-demo";

export type ComponentName = "button-demo";

export const registry: Record<ComponentName, React.ComponentType> = {
  "button-demo": ButtonDemo,
};
