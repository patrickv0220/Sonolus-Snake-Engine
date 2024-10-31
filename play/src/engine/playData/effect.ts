import { EffectClipName } from "@sonolus/core";

export const effect = defineEffect({
    clips: {
    test: EffectClipName.Perfect,
    eat: EffectClipName.PerfectAlternative,
    die: EffectClipName.Hold,
    swipe: EffectClipName.Stage
  },
})
