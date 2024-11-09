import { defineQuery, defineSystem, enterQuery, exitQuery } from 'bitecs'

import Position from '../components/Position'
import Velocity from '../components/Velocity'

export function createPhysicSystem() {
    const query = defineQuery([Position, Velocity])

    function onEnter(eid: number) {}

    function onUpdate(eid: number) {
        Position.x[eid] += Velocity.x[eid]
        Position.y[eid] += Velocity.y[eid]
    }

    function onExit(eid: number) {}

    return defineSystem((word) => {
        for (const eid of enterQuery(query)(word)) {
            onEnter(eid)
        }

        for (const eid of query(word)) {
            onUpdate(eid)
        }

        for (const eid of exitQuery(query)(word)) {
            onExit(eid)
        }

        return word
    })
}
