import { skin } from "../skin.js";
import { apple, game, pos, scaleToGrid as tg } from "./Shared.js";

export class Body extends SpawnableArchetype({}) {
  layout = this.entityMemory(Rect)
  x = this.entityMemory(Number)
  y = this.entityMemory(Number)
  dir = this.entityMemory(Number)
  colour = this.entityMemory(Boolean)
  tickLeft = this.entityMemory(Number)

  initialize() {
    new Rect({
      l: -0.08,
      r: 0.08,
      b: -0.08,
      t: 0.08,
    })
      .translate(tg(pos.x), tg(pos.y))
      .copyTo(this.layout);
    this.x = pos.x
    this.y = pos.y
    this.dir = -1 //-1 so that its only drawn the next tick
    this.tickLeft = game.size
    this.colour = true // ame.bodyColour

  }

  updateSequential() {

  }

  TailDespawnAnimation() {
    if (this.dir == 0) {
      {
        new Rect({
          l: Math.lerp(-0.08, 0.08, game.nextTickAnimationProgress),
          r: 0.08,
          b: -0.08,
          t: 0.08,
        })
          .translate(tg(this.x), tg(this.y))
          .copyTo(this.layout)
      }

    }
    else if (this.dir == 1) {
      {
        new Rect({
          l: -0.08,
          r: 0.08,
          b: Math.lerp(-0.08, 0.08, game.nextTickAnimationProgress),
          t: 0.08,
        })
          .translate(tg(this.x), tg(this.y))
          .copyTo(this.layout)
      }

    }
    else if (this.dir == 2) {
      {
        new Rect({
          l: -0.08,
          r: Math.lerp(0.08, -0.08, game.nextTickAnimationProgress),
          b: -0.08,
          t: 0.08,
        })
          .translate(tg(this.x), tg(this.y))
          .copyTo(this.layout)
      }

    }
    else if (this.dir == 3) {
      {
        new Rect({
          l: -0.08,
          r: 0.08,
          b: -0.08,
          t: Math.lerp(0.08, -0.08, game.nextTickAnimationProgress),
        })
          .translate(tg(this.x), tg(this.y))
          .copyTo(this.layout)
      }
    }

  }

} 
