import { EngineConfigurationOption } from '@sonolus/core'

export const optionsDefinition = {
  timeLimit: {
    name: "Time Limit",
    description: "The game will end forcibly once the time limit is over, could be useful for multiplayer.\nSet it to 0 to disable it.",
    type: "slider",
    def: 0,
    max: 180,
    min: 0,
    step: 5,
    unit: "#SECOND_UNIT",
    standard: true
  },
  noWall: {
    name: "Disable Walls",
    description: "Tired of constantly hitting the grid's walls?\nTry this option, it will wrap you to the other side instead!",
    type: "toggle",
    def: 0,
    standard: true,
  },
  bgm: {
    name: "Background Music",
    description: "Adds a nice background music to make the gameplay even more enjoyable! ♪♪",
    type: "toggle",
    def: 1
  },
  dpad: {
    name: "Movement Method",
    description: "Whether you want to move around by swiping on the screen or by pressing the Dpad's buttons.",
    type: "select",
    def: 0,
    values: ["Swipe", "Dpad"]
  },
  dpadSize: {
    name: "Dpad Size",
    type: "slider",
    def: 5,
    max: 10,
    min: 1,
    step: 1
  }
} satisfies Record<string, EngineConfigurationOption>
