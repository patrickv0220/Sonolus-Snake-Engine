import { options } from "../../configuration/options.js";
import { effect } from "../effect.js";
import { skin } from "../skin.js"
import { pos, game, scaleToGrid as tg, apple, layout } from "./Shared.js"
import { archetypes } from "./index.js";

export class Head extends Archetype {
  updateSequentialOrder = 0
  spawnOrderOrder = 1

  dir = this.entityMemory(Number) //1 up ;3 down; 2 left; 4 right
  previousDir = this.entityMemory(Number)
  nextTick = this.entityMemory(Number)
  borderAlert = this.entityMemory(Boolean)
  blink = this.entityMemory(Number)
  oldPos = this.entityMemory({
    x: Number,
    y: Number
  })
  newApple = this.entityMemory({
    x: Number,
    y: Number
  })


  dpadDown = this.entityMemory(Rect)
  dpadUp = this.entityMemory(Rect)
  dpadRight = this.entityMemory(Rect)
  dpadLeft = this.entityMemory(Rect)

  initialize() {
    this.oldPos.x = pos.x
    this.oldPos.y = pos.y

    this.dir = 4

    archetypes.Body.spawn({})

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

  touchSwipe(touch: Touch) {
    if (touch.vr > 1.5) {
      if (Math.abs(touch.sx - touch.x) > Math.abs(touch.sy - touch.y)) {
        if (touch.sx - touch.x > 0) {
          if (game.dir != 4) this.dir = 2;
        } else {
          if (game.dir != 2) this.dir = 4;
        }
      } else {
        if (touch.sy - touch.y > 0) {
          if (game.dir != 1) this.dir = 3;
        } else {
          if (game.dir != 3) this.dir = 1;
        }
      }
    }
  }

  touchDpad(touch: Touch) {
    //check if touching the dpad
    if (touch.x < screen.l + 0.85 && touch.y < screen.b + 0.85) {
      const deltaX = touch.x - (screen.l + 0.425)
      const deltaY = touch.y - (screen.b + 0.425)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal direction
        if (deltaX > 0) {
          if (game.dir != 2) this.dir = 4; // Right
        } else {
          if (game.dir != 4) this.dir = 2; // Left
        }
      } else {
        // Vertical direction
        if (deltaY > 0) {
          if (game.dir != 3) this.dir = 1; // Up
        } else {
          if (game.dir != 1) this.dir = 3; // Down
        }
      }
    }
  }

  touch() {
    for (const touch of touches) {
      if (options.dpad) this.touchDpad(touch); else this.touchSwipe(touch)
    }
  }

  drawDpad() {
    skin.sprites.buttonH.draw(this.dpadRight, 100, (this.dir === 4) ? 0.4 : 0.8)
    skin.sprites.buttonH.draw(this.dpadLeft, 100, (this.dir === 2) ? 0.4 : 0.8)
    skin.sprites.buttonV.draw(this.dpadDown, 100, (this.dir === 3) ? 0.4 : 0.8)
    skin.sprites.buttonV.draw(this.dpadUp, 100, (this.dir === 1) ? 0.4 : 0.8)
  }

  updateSequential() {
    game.isTick = false
    if (this.nextTick < time.now && !game.lose) {
      this.nextTick = time.now + 0.4

      game.isTick = true
      game.dir = this.dir
      game.tick++

      if (game.dir != this.previousDir) {
        effect.clips.swipe.play(0.02)
        game.shouldSaveData = true
        this.previousDir = game.dir
        game.dataIndex++
      }

      this.oldPos.x = pos.x
      this.oldPos.y = pos.y

      if (Math.random() >= 0.08) this.blink = time.now + 0.5 //randomly blink

      game.bodyColour = !game.bodyColour
      archetypes.Body.spawn({})
      //move haed

      switch (game.dir) {
        case 4: pos.x++; break
        case 2: pos.x--; break
        case 1: pos.y++; break
        case 3: pos.y--; break
      }

      //eat apple
      if (apple.x == pos.x && apple.y == pos.y) {
        game.size++;
        effect.clips.eat.play(0.02)
        archetypes.ScoreEffect.spawn({})
        apple.shouldSpawn = true
      }

      //hit wall
      if (Math.max(pos.x, pos.y) > 9 || Math.min(pos.x, pos.y) < 0) {
        game.lose = true
        effect.clips.die.play(0.02)
        game.deathAnimationTarget = game.size
        game.shouldSaveData = true

      }
      // horder animation 
      this.borderAlert = (Math.max(pos.x, pos.y) > 8 || Math.min(pos.x, pos.y) < 1)
    }


    //make sure apple didnt spawn in body
    if (!apple.shouldSpawn && apple.shouldCheckSpawn) apple.shouldCheckSpawn = false
    //spawn apple
    if (apple.shouldSpawn) {

      apple.shouldSpawn = false
      apple.shouldCheckSpawn = true
      this.newApple.x = Math.randomInt(0, 9)
      this.newApple.y = Math.randomInt(0, 9)
      if (this.newApple.x === apple.x && this.newApple.y === apple.y) {
        apple.x = (this.newApple.x + Math.randomInt(2, 4)) % 10
        apple.y = (this.newApple.y + Math.randomInt(2, 4)) % 10
      } else {
        apple.x = this.newApple.x
        apple.y = this.newApple.y
      }
    }


    if (!game.lose) {
      //lerp animatipn for head and body
      game.nextTickAnimationProgress = (time.now - this.nextTick + 0.4) * 2.5

      //draw head normm1l
      skin.sprites.head.draw(
        layout.sqaure.translate(
          tg(Math.lerp(this.oldPos.x, pos.x, game.nextTickAnimationProgress)),
          tg(Math.lerp(this.oldPos.y, pos.y, game.nextTickAnimationProgress)) + 0.02,
        ), 50, 1)

      //eyelid  
      const a = Math.max(0, Math.min(0.04, (((this.blink - time.now) * -1) * 0.05)))
      skin.sprites.eyelid.draw(layout.line.translate(
        tg(Math.lerp(this.oldPos.x, pos.x, game.nextTickAnimationProgress)),
        tg(Math.lerp(this.oldPos.y, pos.y, game.nextTickAnimationProgress)) + 0.09 - a),
        51, 1)

      skin.sprites.shadow.draw(layout.line.translate(tg(Math.lerp(this.oldPos.x, pos.x, game.nextTickAnimationProgress)), tg(Math.lerp(this.oldPos.y, pos.y, game.nextTickAnimationProgress)) - 0.07), 39, 1)

      if (this.borderAlert && (Math.floor(time.now * 5) % 2 === 0)) skin.sprites.borderDanger.draw(layout.gridBorder, 1, 0.5)



    } else {
      //when game over
      if (this.nextTick < time.now) {
        this.nextTick = time.now + 0.2
        game.deathAnimationTarget--
        if (game.deathAnimationTarget <= 0) game.loseScore = true
      }
      game.nextTickAnimationProgress = (time.now - this.nextTick + 0.2
      ) * 5

      //draw head dead 💀
      skin.sprites.headDead.draw(
        layout.sqaure.translate(tg(this.oldPos.x), tg(this.oldPos.y) + 0.02),
        50, 1)
      skin.sprites.shadow.draw(
        layout.line.translate(tg(this.oldPos.x), tg(this.oldPos.y) - 0.07),
        39, 1)
    }

    //draw apple 🍎
    if (!apple.shouldCheckSpawn && !apple.shouldSpawn) {
      skin.sprites.apple.draw(
        layout.sqaure.translate(tg(apple.x), tg(apple.y)),
        50,
        1
      );
    }
    //draw gride
    skin.sprites.grid.draw(layout.grid, 2, 1)
    skin.sprites.border.draw(layout.gridBorder, 0, 1)

    if (options.dpad) this.drawDpad()
  }
}
