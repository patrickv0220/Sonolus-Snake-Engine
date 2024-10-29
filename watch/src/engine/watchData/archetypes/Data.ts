import { game } from "./Shared.js";

export class Data extends Archetype {

  importDataTickDir = Object.fromEntries(
    Array.from({ length: 16 }, (_, index) => {
      const i = index + 1;
      return [
        [`tick${i}`, { name: `tick${i}`, type: Number }],
        [`dir${i}`, { name: `dir${i}`, type: Number }],
      ];
    }).flat()
  );

  sharedDataTickDir = Object.fromEntries(
    Array.from({ length: 16 }, (_, index) => {
      const i = index + 1;
      return [
        [`tick${i}`, Number],
        [`dir${i}`, Number]
      ];
    }).flat()
  );

  import = this.defineImport(this.importDataTickDir)
  sharedMemory = this.defineSharedMemory(this.sharedDataTickDir)
  testDir = this.entityMemory(Number)

  preprocess() {
    this.sharedMemory.tick1 = this.import.tick1;
    this.sharedMemory.dir1 = this.import.dir1;

    this.sharedMemory.tick2 = this.import.tick2;
    this.sharedMemory.dir2 = this.import.dir2;

    this.sharedMemory.tick3 = this.import.tick3;
    this.sharedMemory.dir3 = this.import.dir3;

    this.sharedMemory.tick4 = this.import.tick4;
    this.sharedMemory.dir4 = this.import.dir4;

    this.sharedMemory.tick5 = this.import.tick5;
    this.sharedMemory.dir5 = this.import.dir5;

    this.sharedMemory.tick6 = this.import.tick6;
    this.sharedMemory.dir6 = this.import.dir6;

    this.sharedMemory.tick7 = this.import.tick7;
    this.sharedMemory.dir7 = this.import.dir7;

    this.sharedMemory.tick8 = this.import.tick8;
    this.sharedMemory.dir8 = this.import.dir8;

    this.sharedMemory.tick9 = this.import.tick9;
    this.sharedMemory.dir9 = this.import.dir9;

    this.sharedMemory.tick10 = this.import.tick10;
    this.sharedMemory.dir10 = this.import.dir10;

    this.sharedMemory.tick11 = this.import.tick11;
    this.sharedMemory.dir11 = this.import.dir11;

    this.sharedMemory.tick12 = this.import.tick12;
    this.sharedMemory.dir12 = this.import.dir12;

    this.sharedMemory.tick13 = this.import.tick13;
    this.sharedMemory.dir13 = this.import.dir13;

    this.sharedMemory.tick14 = this.import.tick14;
    this.sharedMemory.dir14 = this.import.dir14;

    this.sharedMemory.tick15 = this.import.tick15;
    this.sharedMemory.dir15 = this.import.dir15;

    this.sharedMemory.tick16 = this.import.tick16;
    this.sharedMemory.dir16 = this.import.dir16;
  }
  getDir() { 
    const t = Math.floor(time.now / 4);
    if (this.import.tick16 <= t) {
        this.testDir = this.import.dir16;
        return;
    }
    if (this.import.tick15 <= t) {
        this.testDir = this.import.dir15;
        return;
    }
    if (this.import.tick14 <= t) {
        this.testDir = this.import.dir14;
        return;
    }
    if (this.import.tick13 <= t) {
        this.testDir = this.import.dir13;
        return;
    }
    if (this.import.tick12 <= t) {
        this.testDir = this.import.dir12;
        return;
    }
    if (this.import.tick11 <= t) {
        this.testDir = this.import.dir11;
        return;
    }
    if (this.import.tick10 <= t) {
        this.testDir = this.import.dir10;
        return;
    }
    if (this.import.tick9 <= t) {
        this.testDir = this.import.dir9;
        return;
    }
    if (this.import.tick8 <= t) {
        this.testDir = this.import.dir8;
        return;
    }
    if (this.import.tick7 <= t) {
        this.testDir = this.import.dir7;
        return;
    }
    if (this.import.tick6 <= t) {
        this.testDir = this.import.dir6;
        return;
    }
    if (this.import.tick5 <= t) {
        this.testDir = this.import.dir5;
        return;
    }
    if (this.import.tick4 <= t) {
        this.testDir = this.import.dir4;
        return;
    }
    if (this.import.tick3 <= t) {
        this.testDir = this.import.dir3;
        return;
    }
    if (this.import.tick2 <= t) {
        this.testDir = this.import.dir2;
        return;
    }
    if (this.import.tick1 <= t) {
        this.testDir = this.import.dir1;
        return;
    }

    // If no tick is less than or equal to `t`, the direction might be unset
    debug.log(696969) // or a default direction if needed
}

  updateSequential() {
this.getDir()
    game.dir=this.testDir
    debug.log(this.import.tick1)
    debug.log(this.import.tick16)


  }
  spawnTime() {
    return this.sharedMemory.tick1 * 0.4
  }

  despawnTime() {
    return (this.sharedMemory.tick16 == 0) ? 99999 : this.sharedMemory.tick16 * 0.4
  }

}
