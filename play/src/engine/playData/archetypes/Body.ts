import { effect } from "../effect.js";
import { skin } from "../skin.js";
import { apple, game, layout, pos, scaleToGrid as tg } from "./Shared.js";

export class Body extends SpawnableArchetype({}) {

  updateSequentialOrder = 1

  layout = this.entityMemory(Rect)
  layoutShadow = this.entityMemory(Rect)
  x = this.entityMemory(Number)
  y = this.entityMemory(Number)
  dir = this.entityMemory(Number) //used for the despawn animation
  colour = this.entityMemory(Boolean)
  tickLeft = this.entityMemory(Number)


  initialize() {
    layout.sqaure.translate(tg(pos.x), tg(pos.y) + 0.02)
      .copyTo(this.layout)
    layout.line.translate(tg(pos.x), tg(pos.y) - 0.07)
      .copyTo(this.layoutShadow)
    this.x = pos.x
    this.y = pos.y
    this.dir = -1 //-1 so that its only drawn the next tick
    this.tickLeft = game.size
    this.colour = game.bodyColour
  }


  updateSequential() {
    if (game.isTick) {
      if (!game.lose) {
        if (this.dir === -1) this.dir = game.dir
        this.tickLeft--
        if (this.tickLeft === 0) { this.despawn = true } else {
          //detect if the head hit the body.
          if (this.x == pos.x && this.y == pos.y) {
            game.lose = true
            effect.clips.die.play(0.02)
            game.deathAnimationTarget = game.size
            game.shouldSaveData = true
          }
        }
      } else if (this.tickLeft === 1) {
        this.despawn = true
      }
    }

    //respawn the apple if it spawned inside the body
    if (apple.shouldCheckSpawn && this.x == apple.x && this.y == apple.y) {
      apple.shouldSpawn = true
      apple.shouldCheckSpawn = false
    }
  }
  updateParallel() {
    //draw the body part
    if (game.lose) {
      if (game.deathAnimationTarget === this.tickLeft) {
        const y = Math.abs(0.2 - Math.abs(Math.lerp(-0.02, 0.02, game.nextTickAnimationProgress)))
        layout.sqaure.translate(tg(this.x), tg(this.y) + y - 0.16).copyTo(this.layout)
      }
    } else {
      if (this.tickLeft === 1) this.TailDespawnAnimation()
    }
    if (this.dir != -1) {
      if (this.colour) { skin.sprites.bodyDark.draw(this.layout, 40, 1) } else { skin.sprites.bodyLight.draw(this.layout, 40, 1) }
      skin.sprites.shadow.draw(this.layout.translate(0, -0.02), 39, 1)
    }
  }


  TailDespawnAnimation() {
    switch (this.dir) {
      case 4:
        {
          new Rect({
            l: Math.lerp(-0.08, 0.08, game.nextTickAnimationProgress),
            r: 0.08,
            b: -0.08,
            t: 0.08,
          })
            .translate(tg(this.x), tg(this.y) + 0.02)
            .copyTo(this.layout)
        }

        break;
      case 1:
        {
          new Rect({
            l: -0.08,
            r: 0.08,
            b: Math.lerp(-0.08, 0.08, game.nextTickAnimationProgress),
            t: 0.08,
          })
            .translate(tg(this.x), tg(this.y) + 0.02)
            .copyTo(this.layout)
        }

        break;
      case 2:
        {
          new Rect({
            l: -0.08,
            r: Math.lerp(0.08, -0.08, game.nextTickAnimationProgress),
            b: -0.08,
            t: 0.08,
          })
            .translate(tg(this.x), tg(this.y) + 0.02)
            .copyTo(this.layout)
        }

        break;
      case 3:
        {
          new Rect({
            l: -0.08,
            r: 0.08,
            b: -0.08,
            t: Math.lerp(0.08, -0.08, game.nextTickAnimationProgress),
          })
            .translate(tg(this.x), tg(this.y) + 0.02)
            .copyTo(this.layout)
        }
        break;
    }
  }

} 
