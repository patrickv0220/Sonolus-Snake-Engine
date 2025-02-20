import { skin } from '../../../../shared/skin.js'
import { particle } from '../../../../shared/particle.js'
import { effect } from '../../../../shared/effect.js'
import { archetypes } from './archetypes/index.js'
import { updateSpawn } from './updateSpawn.js'

const buckets = defineBuckets({})

export const watchData = {
    skin,
    effect,
    particle,
    buckets,
    archetypes,
    updateSpawn,

    globalResolver: (name: string) => eval(name) as unknown,
}
