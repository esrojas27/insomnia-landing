import { memo } from "react";

// Renders a static grain effect over the entire viewport
export const GrainOverlay = memo(() => {
  return <div className="grain" aria-hidden="true" />;
});
