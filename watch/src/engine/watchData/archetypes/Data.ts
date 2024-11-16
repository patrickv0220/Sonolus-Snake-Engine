import { effect } from "../effect.js";
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
    ,
  ) as Record<`tick${number}` | `dir${number}`, { name: string; type: NumberConstructor }>;


  import = this.defineImport(this.importDataTickDir)
  testDir = this.entityMemory(Number)
  testTick = this.entityMemory(Number)

  getDir() {
    const t = Math.floor((time.now) / 0.4)
    if (debug.enabled) effect.clips.test.play(0.02)

    this.testDir = 0
    if (this.import.tick16 != 0 && this.import.tick16 <= t) {
      this.testDir = this.import.dir16;
      this.testTick = this.import.tick16
      return;
    }
    if (this.import.tick15 != 0 && this.import.tick15 <= t) {
      this.testDir = this.import.dir15;
      this.testTick = this.import.tick15
      return;
    }
    if (this.import.tick14 != 0 && this.import.tick14 <= t) {
      this.testDir = this.import.dir14;
      this.testTick = this.import.tick14
      return;
    }
    if (this.import.tick13 != 0 && this.import.tick13 <= t) {
      this.testDir = this.import.dir13;
      this.testTick = this.import.tick13
      return;
    }
    if (this.import.tick12 != 0 && this.import.tick12 <= t) {
      this.testDir = this.import.dir12;
      this.testTick = this.import.tick11
      return;
    }
    if (this.import.tick11 != 0 && this.import.tick11 <= t) {
      this.testDir = this.import.dir11;
      this.testTick = this.import.tick11
      return;
    }
    if (this.import.tick10 != 0 && this.import.tick10 <= t) {
      this.testDir = this.import.dir10;
      this.testTick = this.import.tick10
      return;
    }
    if (this.import.tick9 != 0 && this.import.tick9 <= t) {
      this.testDir = this.import.dir9;
      this.testTick = this.import.tick9
      return;
    }
    if (this.import.tick8 != 0 && this.import.tick8 <= t) {
      this.testDir = this.import.dir8;
      this.testTick = this.import.tick8
      return;
    }
    if (this.import.tick7 != 0 && this.import.tick7 <= t) {
      this.testDir = this.import.dir7;
      this.testTick = this.import.tick7
      return;
    }
    if (this.import.tick6 != 0 && this.import.tick6 <= t) {
      this.testDir = this.import.dir6;
      this.testTick = this.import.tick6
      return;
    }
    if (this.import.tick5 != 0 && this.import.tick5 <= t) {
      this.testDir = this.import.dir5;
      this.testTick = this.import.tick5
      return;
    }
    if (this.import.tick4 != 0 && this.import.tick4 <= t) {
      this.testDir = this.import.dir4;
      this.testTick = this.import.tick4
      return;
    }
    if (this.import.tick3 != 0 && this.import.tick3 <= t) {
      this.testDir = this.import.dir3;
      this.testTick = this.import.tick3
      return;
    }
    if (this.import.tick2 != 0 && this.import.tick2 <= t) {
      this.testDir = this.import.dir2;
      this.testTick = this.import.tick2
      return;
    }
    if (this.import.tick1 != 0 && this.import.tick1-1 <= t) {
      this.testDir = this.import.dir1;
      this.testTick = this.import.tick1
      return;
    }
  }

  updateSequential() {
    effect.clips.test.play(0.02)
    this.getDir()
    if (this.testDir != 0) {
      game.nextDir = this.testDir
      game.nextTick = this.testTick
    }
  }
  spawnTime() {
    return (this.import.tick1 == 0) ? -999 : (this.import.tick1) * 0.4 -0.05
  }

  despawnTime() {
    if (this.import.tick1 == 0) {
      return -999
    } else {
      return (this.import.tick16 == 0) ? 999999 : (this.import.tick16) * 0.4 + 0.15
    }
  }
}
