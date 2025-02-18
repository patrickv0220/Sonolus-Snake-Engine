import { game } from "./Shared.js";

export class Data extends Archetype {

  exportDataTickDir = Object.fromEntries(
    Array.from({ length: 16 }, (_, index) => {
      const i = index + 1;
      return [
        [`tick${i}`, { name: `tick${i}`, type: Number }],
        [`dir${i}`, { name: `dir${i}`, type: Number }],
      ];
    }).flat()
  );

  import = this.defineImport({
    DataIndex: { name: "DataIndex", type: Number },
  })
  export = this.defineExport(this.exportDataTickDir)

  spawnOrderOrder = 3

  shouldSpawn() {
    return true
  }

  updateSequential() {

    if (game.dataIndex >= (this.import.DataIndex-1) * 16&&game.dataIndex <= this.import.DataIndex * 16 && game.shouldSaveData) {
      game.shouldSaveData = false
      const t = game.tick
      const d = (game.lose) ? 5 : game.dir
        
      switch (game.dataIndex % 16) {
        case 1:
          this.export("tick1", t)
          this.export("dir1", d)
          break;
        case 2:
          this.export("tick2", t)
          this.export("dir2", d)
          break;
        case 3:
          this.export("tick3", t)
          this.export("dir3", d)
          break;
        case 4:
          this.export("tick4", t)
          this.export("dir4", d)
          break;
        case 5:
          this.export("tick5", t)
          this.export("dir5", d)
          break;
        case 6:
          this.export("tick6", t)
          this.export("dir6", d)
          break;
        case 7:
          this.export("tick7", t)
          this.export("dir7", d)
          break;
        case 8:
          this.export("tick8", t)
          this.export("dir8", d)
          break;
        case 9:
          this.export("tick9", t)
          this.export("dir9", d)
          break;
        case 10:
          this.export("tick10", t)
          this.export("dir10", d)
          break;
        case 11:
          this.export("tick11", t)
          this.export("dir11", d)
          break;
        case 12:
          this.export("tick12", t)
          this.export("dir12", d)
          break;
        case 13:
          this.export("tick13", t)
          this.export("dir13", d)
          break;
        case 14:
          this.export("tick14", t)
          this.export("dir14", d)
          break;
        case 15:
          this.export("tick15", t)
          this.export("dir15", d)
          break;
        case 0:
          this.export("tick16", t)
          this.export("dir16", d)
          this.despawn = true
          break;
      }
    }
  }
}
