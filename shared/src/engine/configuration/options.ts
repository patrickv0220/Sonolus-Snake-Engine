import { EngineConfigurationOption } from '@sonolus/core'

export const optionsDefinition = {
  dpad: {
    name:"movement method",
    type: "select",
    def: 0,
    values:["swipe","dpad"] 


  }
} satisfies Record<string, EngineConfigurationOption>
