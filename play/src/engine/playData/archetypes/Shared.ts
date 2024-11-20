import { effect } from "../effect.js"

//game variables
export const pos = levelMemory({
  x: Number,
  y: Number
})

export const game = levelMemory({
  isTick: Boolean,
  shouldSaveData: Boolean,
  tick: Number,
  tickDuration: Number,
  dir: Number,
  size: Number,
  lose: Boolean, //dispawn the score entities onxe the dzath anumation is complete
  loseScore: Boolean,
  deathTime: Number,
  nextTickAnimationProgress: Number,//used for the lerp animation when drawiing movinng head and tail and for the death animation
  bodyColour: Boolean,//used to alternate the body colours
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

export const death = () => {
  game.lose = true
  effect.clips.die.play(0.02)
  game.dataIndex++
  game.shouldSaveData = true
  game.deathTime = time.now
}

export const floatingEffect = (
  { l, r, b, t }: RectLike,
): Quad => {
  const p = Math.sin(time.now * 2.5)
  const offsetY = p * 0.02
  const angle = p * 0.05

  return new Quad({
    y1: (l) * Math.sin(angle) + (b + offsetY) * Math.cos(angle),
    y2: (l) * Math.sin(angle) + (t + offsetY) * Math.cos(angle),
    y3: (r) * Math.sin(angle) + (t + offsetY) * Math.cos(angle),
    y4: (r) * Math.sin(angle) + (b + offsetY) * Math.cos(angle),

    x1: (l) * Math.cos(angle) - ((b + offsetY)) * Math.sin(angle),
    x2: (l) * Math.cos(angle) - ((t + offsetY)) * Math.sin(angle),
    x3: (r) * Math.cos(angle) - ((t + offsetY)) * Math.sin(angle),
    x4: (r) * Math.cos(angle) - ((b + offsetY)) * Math.sin(angle),
  });
};


