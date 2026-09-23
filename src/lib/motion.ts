import type { Transition } from "framer-motion";

/** Named motion presets — rhythm by intent, not one spring everywhere. */
export const motionTokens: Record<string, Transition> = {
  entrance: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  snappy: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  playful: { type: "spring", stiffness: 260, damping: 18 },
};
