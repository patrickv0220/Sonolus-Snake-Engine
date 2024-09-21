import { apple, game } from "./Shared.js"

export class Score extends Archetype {
  import = this.defineImport({
    ScoreIndex: { name: "ScoreIndex", type: Number },
  })

  export = this.defineExport({
    appleX:{name:"appleX", type:Number},
    appleY:{name:"appleY", type:Number},
    tick: {name:"tick", type:Number}
  })
  hasInput = true

  spawnOrder(): number {
      return 4
  }
  shouldSpawn() {
    return game.size - 3 >= this.import.ScoreIndex || game.loseScore//-3 since 3 is default size
  }

  updateParallel() {
    this.despawn = true
    if (game.loseScore) return
    this.export("appleX",apple.x)
    this.export("appleY",apple.y)
    this.export("tick", Math.floor(time.now / 0.4))
    this.result.judgment = Judgment.Perfect
  }
}
