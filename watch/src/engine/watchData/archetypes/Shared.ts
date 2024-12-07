//game variables
export const pos = levelMemory({
  x: Number,
  y: Number
})

export const game = levelMemory({
  isTick: Boolean,
  tick: Number,
  dir: Number,
  nextDir: Number,
  nextTick: Number,
  size: Number,
  lose: Boolean,
  nextTickAnimationProgress: Number,//used for the lerp animation when drawiing movinng head and tai
  bodyColour: Boolean,//used to alternate the body colour
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
  dpadLeft: new Quad({
    x1: -0.05, y1: -0.1,
    x2: -0.3, y2: -0.1,
    x3: -0.3, y3: 0.1,
    x4: -0.05, y4: 0.1,
  }),
  dpadRight: new Quad({
    x1: 0.05, y1: -0.1,
    x2: 0.3, y2: -0.1,
    x3: 0.3, y3: 0.1,
    x4: 0.05, y4: 0.1,
  })
}
export const scaleToGrid = (x: number): number => x * 0.16 - 0.72


