import { game, pos } from "./Shared.js"

export class Initialization extends Archetype {
    preprocess() {
        ui.menu.set({
            anchor: screen.rect.lt.add(new Vec(0.05, -0.05)),
            pivot: { x: 0, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        // ui.progress.set({
        //     anchor: screen.rect.lb.add(new Vec(0.05, 0.05)),
        //     pivot: { x: 0, y: 0 },
        //     size: { x: screen.rect.w - 0.1, y: 0.15 * ui.configuration.progress.scale },
        //     rotation: 0,
        //     alpha: ui.configuration.progress.alpha,
        //     horizontalAlign: HorizontalAlign.Center,
        //     background: true,
        // })
    ui.combo.value.set({
      anchor: { x: screen.r * 0.75, y: -0.1 },
      pivot: { x: 0, y: 0 },
      size: new Vec(0, 0.35).mul(ui.configuration.combo.scale),
      rotation: 0,
      alpha: ui.configuration.combo.alpha,
      horizontalAlign: HorizontalAlign.Center,
      background: true,
    })
game.tick=1
    pos.x=1
    pos.y=3
    }
}
