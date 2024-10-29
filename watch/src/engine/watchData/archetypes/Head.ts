import { options } from "../../configuration/options.js"
import { skin } from "../skin.js"
import { archetypes } from "./index.js"
import { pos, game, scaleToGrid as tg, layout } from "./Shared.js"

export class Head extends Archetype {

  tick = this.entityMemory(Number)
  dataIndex = this.entityMemory(Number)
  nextTick = this.entityMemory(Number)
  dir = this.entityMemory(Number) //1 up ;3 down; 2 left; 0 right
  spawnTime() { return -999999 }

  despawnTime() { return 999999 }
  dpadDown = this.entityMemory(Rect)
  dpadUp = this.entityMemory(Rect)
  dpadRight = this.entityMemory(Rect)
  dpadLeft = this.entityMemory(Rect)
  initialize() {
    layout.dpadUp
      .translate(screen.l + 0.45, screen.b + 0.45)
      .copyTo(this.dpadUp)
    layout.dpadDown
      .translate(screen.l + 0.45, screen.b + 0.45)
      .copyTo(this.dpadDown)
    layout.dpadLeft
      .translate(screen.l + 0.45, screen.b + 0.45)
      .copyTo(this.dpadLeft)
    layout.dpadRight
      .translate(screen.l + 0.45, screen.b + 0.45)
      .copyTo(this.dpadRight)
  }


  drawDpad() {
    skin.sprites.buttonH.draw(this.dpadRight, 100, (this.dir === 0) ? 0.4 : 0.8)
    skin.sprites.buttonH.draw(this.dpadLeft, 100, (this.dir === 2) ? 0.4 : 0.8)
    skin.sprites.buttonV.draw(this.dpadDown, 100, (this.dir === 3) ? 0.4 : 0.8)
    skin.sprites.buttonV.draw(this.dpadUp, 100, (this.dir === 1) ? 0.4 : 0.8)
  }


  // const a = archetypes.Data.sharedMemory.get(1)
  updateSequential() {
    // this.tick = Math.floor(time.now / 0.4)
    this.dir=game.dir
    if (this.nextTick < time.now) {
      this.nextTick = time.now + 0.4
      this.tick++
      //debug.log(archetypes.Data.sharedMemory.get(this.dataIndex))



      //move haed
      switch (game.dir) {
        case 4: pos.x++; break
        case 2: pos.x--; break
        case 1: pos.x++; break
        case 3: pos.y--; break
      }
    }
    skin.sprites.head.draw(layout.sqaure.translate(tg(pos.x), tg(pos.y)), 50, 1)
    if (options.dpad) this.drawDpad()
//draw gride
    skin.sprites.grid.draw(layout.grid, 2, 1)
    skin.sprites.border.draw(layout.gridBorder, 0, 1)

  }
}
