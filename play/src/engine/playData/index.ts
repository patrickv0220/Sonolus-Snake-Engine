import { skin } from '../../../../shared/skin.js'
import { particle } from '../../../../shared/particle.js'
import { effect } from '../../../../shared/effect.js'
import { archetypes } from './archetypes/index.js'

const buckets = defineBuckets({})

export const playData = {
    skin,
    effect,
    particle,
    buckets,
    archetypes,

    globalResolver: (name: string) => eval(name) as unknown,
}
