import { effect } from "../../../../../shared/effect.js"
import { options } from "../../configuration.js"

//game variables

//pos is snake position
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
  loseScore: Boolean, //dispawn the score entities once the death anumation is complete
  deathTime: Number,
  nextTickAnimationProgress: Number,//used for the lerp animation when drawiing movinng head and tail and for the death animation
  bodyColour: Boolean,//used to alternate the body colours
})

//used to export data to replay mode
export const data = levelMemory({
  shouldSaveDirection: Boolean,
  shouldSaveApple: Boolean,
  shouldSaveDeath: Boolean,
  Index: Number,
})

export const apple = levelMemory({
  x: Number,
  y: Number,
  shouldSpawn: Boolean,
  shouldCheckSpawn: Boolean,
})

//static layout used for drawing stuff
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
  }),
  scoreDigit: new Rect({ l: -0.08, r: 0.08, b: -0.16, t: 0.16 }),
  score: new Rect({ l: -0.3, r: 0.3, b: -0.096, t: 0.096 }),
}

/** given a position on the grid (x int between 0 and 9)
 * will return x's position on the screen to draw something*/
export const scaleToGrid = (x: number): number => x * 0.16 - 0.72

/** function to call when the snake dies,
 * will be executed by both `Head` and `Body` entities*/
export const death = () => {
  game.lose = true
  if (options.bgm) effect.clips.bgm_end.play(0.02); else effect.clips.die.play(0.02)
  data.shouldSaveDeath = true
  game.deathTime = time.now
}

/** used for the floating apple animation*/
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


