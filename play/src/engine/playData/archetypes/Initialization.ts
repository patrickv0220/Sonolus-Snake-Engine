import { apple, game, pos } from "./Shared.js";

export class Initialization extends Archetype {
  spawnOrderOrder = 0

  preprocess() {
    ui.menu.set({
      anchor: new Rect({
        l: screen.l + 0.05,
        r: screen.r - 0.05,
        b: screen.b + 0.05,
        t: screen.t - 0.05,
      }).rt,
      pivot: { x: 1, y: 1 },
      size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
      rotation: 0,
      alpha: ui.configuration.menu.alpha,
      horizontalAlign: HorizontalAlign.Center,
      background: true,
    });
    ui.combo.value.set({
      anchor: { x: screen.r * 0.75, y: -0.1 },
      pivot: { x: 0, y: 0 },
      size: new Vec(0, 0.35).mul(ui.configuration.combo.scale),
      rotation: 0,
      alpha: ui.configuration.combo.alpha,
      horizontalAlign: HorizontalAlign.Center,
      background: true,
    })

    game.size = 3
    apple.shouldSpawn = true
    pos.x = 1
    pos.y = 3
  }

  updateSequential() {
    this.despawn = true
  }
}
