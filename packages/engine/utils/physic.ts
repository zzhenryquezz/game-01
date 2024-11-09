import * as b from 'bitecs'
import { defineEntityExtension } from './defineEntityComposable'
import Position from '../components/Position'
import Velocity from '../components/Velocity'

export const usePhysic = defineEntityExtension((word: b.IWorld, eid: number) => {
    b.addComponent(word, Position, eid)
    b.addComponent(word, Velocity, eid)

    const physic = {
        move: (x = 0, y = 0) => {
            Velocity.x[eid] = x
            Velocity.y[eid] = y

            return physic
        },
        setPosition: (x = 0, y = 0) => {
            Position.x[eid] = x
            Position.y[eid] = y

            return physic
        },
    }

    return {
        physic,
    }
})
