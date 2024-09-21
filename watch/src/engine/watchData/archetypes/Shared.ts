//game variables
export const pos = levelMemory({
  x: Number,
  y: Number
})

export const game = levelMemory({
  isTick: Boolean,
  dir: Number,
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
}
export const scaleToGrid = (x:number):number => x* 0.16-0.72


