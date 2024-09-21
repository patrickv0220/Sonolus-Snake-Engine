import { EngineArchetypeDataName } from '@sonolus/core'
import { skin } from '../skin.js'
import { layout, scaleToGrid } from './Shared.js'

export class Score extends Archetype {
  import = this.defineImport({
    ScoreIndex: { name: "ScoreIndex", type: Number },
    judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
    appleX: { name: "appleX", type: Number },
    appleY: { name: "appleY", type: Number },
    tick: { name: "tick", type: Number }

  })

  sharedMemory = this.defineSharedMemory({
    tick:Number,
    appleX:Number,
    appleY:Number
  })

  preprocess() {
    if (this.import.judgment === Judgment.Perfect) {
      this.sharedMemory.tick=this.import.tick
       this.sharedMemory.appleX=this.import.appleX
       this.sharedMemory.appleY=this.import.appleY
    }
  }

  spawnTime() {
    return -999999
  }

  despawnTime() {
    return 999999
  }

  hasInput = true

  updateParallel() {
    skin.sprites.apple.draw(
      layout.sqaure.translate(
        scaleToGrid(this.import.appleX),
        scaleToGrid(this.import.appleY)
      ),
    1,
    1)
  }
}
