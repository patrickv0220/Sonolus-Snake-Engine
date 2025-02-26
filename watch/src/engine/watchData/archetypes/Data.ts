import { game } from "./Shared.js"

/** Frame on tick:
 * - head sets game.isTick to true and updates game.tick
 * - head updates the game accoringly with the game.dataDir for this tick set **PREVIOUS TICK**  by the data entity
 * - on game.isTick==True, Data reads the event that happened on the **NEXT** tick and update game.dataDir (set it to 0 if nothing happens)
 *   (this won't work if 2 "events" haappen on the same tick, but whatever)
 *  Next frame:
 * - head sets game.isTick to false and wait until next tick*/
export class Data extends Archetype {


  updateSequentialOrder = 999

  spawnTime() { return -999999 }
  despawnTime() { return 999999 }


  importDataTickDir = Object.fromEntries(
    Array.from({ length: 16 }, (_, index) => {
      const i = index + 1
      return [
        [`tick${i}`, { name: `tick${i}`, type: Number }],
        [`dir${i}`, { name: `dir${i}`, type: Number }],
      ]
    }).flat()
    ,
  ) as Record<`tick${number}` | `dir${number}`, { name: string; type: NumberConstructor }>


  import = this.defineImport(this.importDataTickDir)

  //this is a bit messy, but we need to read data before the first game.isTick
  //so we use this varaible to represent wether it has been read or not
  //before first game.isTick, game.tick is 0, so t=1 which match our play mode
  hadReadFirstTick = this.entityMemory(Boolean)

  getDir(t: number): number {
    const i = this.import

    //if the first tick is 0, it means this Data entity never saved any data
    if (i.tick1 == 0) return 0

    let s = game.dataSuccessIndex
    let d = 0

    // using switch here doesn't really make sense,
    // however I was previously using `else if` for each `case` but that caused issues with sonolus.js
    switch (true) {
      case (i.tick1 == t && s != 1):
        s = 1
        d = i.dir1
        break
      case (i.tick2 == t && s != 2):
        s = 2
        d = i.dir2
        break
      case (i.tick3 == t && s != 3):
        s = 3
        d = i.dir3
        break
      case (i.tick4 == t && s != 4):
        s = 4
        d = i.dir4
        break
      case (i.tick5 == t && s != 5):
        s = 5
        d = i.dir5
        break
      case (i.tick6 == t && s != 6):
        s = 6
        d = i.dir6
        break
      case (i.tick7 == t && s != 7):
        s = 7
        d = i.dir7
        break
      case (i.tick8 == t && s != 8):
        s = 8
        d = i.dir8
        break
      case (i.tick9 == t && s != 9):
        s = 9
        d = i.dir9
        break
      case (i.tick10 == t && s != 10):
        s = 10
        d = i.dir10
        break
      case (i.tick11 == t && s != 11):
        s = 11
        d = i.dir11
        break
      case (i.tick12 == t && s != 12):
        s = 12
        d = i.dir12
        break
      case (i.tick13 == t && s != 13):
        s = 13
        d = i.dir13
        break
      case (i.tick14 == t && s != 14):
        s = 14
        d = i.dir14
        break
      case (i.tick15 == t && s != 15):
        s = 15
        d = i.dir15
        break
      case (i.tick16 == t && s != 16):
        s = 16
        d = i.dir16
        break
    }

    game.dataSuccessIndex = s
    return d
  }

  updateSequential() {
    if (game.isTick || !this.hadReadFirstTick) {
      this.hadReadFirstTick = true
      game.dataSuccessIndex = 0
      let a = this.getDir(game.tick + 1) //we want the event of the next tick
      if (a != 0) {
        game.dataDir = a

        //in case 2 events on same tick, we  now look at the 2nd event (so w/ a diff index `s`)
        let b = this.getDir(game.tick + 1)
        if (b != 0) {
          game.dataDir2 = b
        }

      }
    }
  }
}
