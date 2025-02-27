import { skin } from "../../../../../shared/skin.js";
import { layout, TailDespawnAnimation, scaleToGrid as tg } from "../../../../../shared/utilities.js";
import { body, game, pos } from "./Shared.js";

/** Unlike in play mode, in watch mode the body entity draws ALL the body parts
 * as a single entity*/
export class Body extends SpawnableArchetype({}) {

  updateSequentialOrder = 1000

  spawnTime() { return -999999 }
  despawnTime() { return 999999 }


  updateSequential() {
    if (game.isTick) {
      //add body
      body.pos.set(game.tick % 100, (game.dir * 100 + pos.x * 10 + pos.y))
      body.tickLeft.set(game.tick % 100, game.size + game.tick)
    }
  }


  updateParallel() {
    //draw the body parts
    for (let index = 0; index < 100; index++) {

      //check if that part should be drawn
      if (body.tickLeft.get(index) > game.tick) {

        const x = Math.floor((body.pos.get(index) % 100) / 10)
        const y = body.pos.get(index) % 10

        const bodySkin = (index % 2 == 0) ? skin.sprites.bodyLight.id : skin.sprites.bodyDark.id

        //draw the despawning one
        if (body.tickLeft.get(index) == game.tick + 1) {
          const dir = Math.floor(body.pos.get((index + 1) % 100) / 100)
          let rect = new Rect
          TailDespawnAnimation(rect, dir, { x: x, y: y }, game.nextTickAnimationProgress)

          skin.sprites.shadow.draw(rect.translate(0, -0.02), 39, 1)
          skin.sprites.draw(bodySkin, rect, 40, 1)
        }

        //draw "normal" body parts
        else if (body.tickLeft.get(index) < game.tick + game.size) {

          const bodyRect = layout.sqaure.translate(tg(x), tg(y) + 0.02)
          const shadow = layout.line.translate(tg(x), tg(y) - 0.07)

          skin.sprites.shadow.draw(shadow, 39, 1)
          skin.sprites.draw(bodySkin, bodyRect, 40, 1)
        }

      }
    }

  }

} 
