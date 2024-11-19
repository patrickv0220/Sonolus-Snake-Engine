import { EngineConfigurationOption } from '@sonolus/core'

export const optionsDefinition = {
  dpad: {
    name: "Movement Method",
    type: "select",
    def: 0,
    values: ["Swipe", "Dpad"]
  },
  noWall: {
    name: "Disable Walls",
    type: "toggle",
    def: 0,
    standard: true,
  }
} satisfies Record<string, EngineConfigurationOption>
