
//game variables
export const pos = levelMemory({
  x: Number,
  y: Number
})

export const game = levelMemory({
  isTick: Boolean,
  shouldSaveData: Boolean,
  tick: Number,
  dir: Number,
  size: Number,
  lose: Boolean,
  loseScore: Boolean,
  nextTickAnimationProgress: Number,//used for the lerp animation when drawiing movinng head and tail and for the death animation
  bodyColour: Boolean,//used to alternate the body colours
  deathAnimationTarget: Number,
  dataIndex: Number,
})

export const apple = levelMemory({
  x: Number,
  y: Number,
  shouldSpawn: Boolean,
  shouldCheckSpawn: Boolean,
})

export const layout = {
  sqaure: Rect.one.mul(0.08),
  line: new Rect({ l: -0.08, r: 0.08, b: -0.01, t: 0.01, }), //used for shadows and eyelid
  grid: Rect.one.mul(0.8),
  gridBorder: Rect.one.mul(0.88),
  dpadUp: new Rect({ l: -0.1, r: 0.1, b: 0.05, t: 0.3 }),
  dpadDown: new Rect({ l: -0.1, r: 0.1, b: -0.05, t: -0.3 }),
  dpadLeft: new Rect({ l: -0.05, r: -0.3, b: -0.1, t: 0.1 }),
  dpadRight: new Rect({ l: 0.05, r: 0.3, b: -0.1, t: 0.1 }),
}

export const scaleToGrid = (x: number): number => x * 0.16 - 0.72

