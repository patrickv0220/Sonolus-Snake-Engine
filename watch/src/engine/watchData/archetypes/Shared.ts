//game variables
export const pos = levelMemory({
  x: Number,
  y: Number
})

export const game = levelMemory({
  isTick: Boolean,
  tick: Number,
  tickDuration: Number,
  dir: Number,
  size: Number,
  lose: Boolean,
  nextTickAnimationProgress: Number,//used for the lerp animation when drawiing movinng head and tai
  bodyColour: Boolean,//used to alternate the body colour
  dataDir: Number,
  dataDir2: Number,
})

export const apple = levelMemory({
  x: Number,
  y: Number,
})
