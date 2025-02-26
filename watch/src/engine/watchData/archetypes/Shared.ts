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
  dataSuccessIndex: Number, //used to check thie same tick twice in case 2 events happened
})

export const body = levelMemory({
  pos: Tuple(100, Number), // {dir}{x}{y}
  tickLeft: Tuple(100, Number),
})

export const apple = levelMemory({
  x: Number,
  y: Number,
})
