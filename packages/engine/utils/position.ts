import * as b from 'bitecs'
import Position from '../components/Position'
import { defineEntityExtension } from './defineEntityComposable'

export const usePosition = defineEntityExtension((word: b.IWorld, eid: number) => {
    b.addComponent(word, Position, eid)

    const position = {
        move: (x: number, y: number) => {
            Position.x[eid] = x
            Position.y[eid] = y

            return position
        },
    }

    return {
        position,
    }
})
