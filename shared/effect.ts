import { EffectClipName } from "@sonolus/core";

export const effect = defineEffect({
    clips: {
    eat: "#APPLE",
    die: EffectClipName.Hold,
    swipe: EffectClipName.Stage,
    wrap: EffectClipName.Good,
    bgm: "#BGM",
    bgm_end: "#BGM_END"
  },
})
