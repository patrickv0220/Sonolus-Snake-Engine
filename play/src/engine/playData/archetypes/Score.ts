import { game } from "./Shared.js"

export class Score extends Archetype {
  import = this.defineImport({
    ScoreIndex: { name: "ScoreIndex", type: Number },
  })

  hasInput = true

  spawnOrder(): number {
      return 4
  }
  shouldSpawn() {
    return game.loseScore && (game.deathTime +2 < time.now )
  }

  updateParallel() {
    this.despawn = true
    this.result.accuracy= 1-(game.size-3)*0.001
    if ( game.size - 3 < this.import.ScoreIndex) return //-3 since 3 is default size
    this.result.judgment = Judgment.Perfect
  }
}
