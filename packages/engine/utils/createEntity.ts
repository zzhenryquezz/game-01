import * as b from 'bitecs'
import { compose } from '@sidekick-coder/compositor'
import { EntityComposable } from './defineEntityComposable'

function addEntity(_word: b.IWorld, eid: number) {
    return {
        eid,
    }
}

export function createEntity<T extends EntityComposable>(word: b.IWorld, composables: T[]) {
    const eid = b.addEntity(word)

    return compose(addEntity, composables)(word, eid)
}
