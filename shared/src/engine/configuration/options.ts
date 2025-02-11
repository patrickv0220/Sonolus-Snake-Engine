import { EngineConfigurationOption } from '@sonolus/core'

export const optionsDefinition = {
  bgm: {
    name: "Background Music",
    type: "toggle",
    def: 1
  },
  dpad: {
    name: "Movement Method",
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
  },
  noWall: {
    name: "Disable Walls",
    type: "toggle",
    def: 0,
    standard: true,
  }
} satisfies Record<string, EngineConfigurationOption>
