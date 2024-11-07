import * as b from 'bitecs'

export interface EntityComposable {
    (word: b.IWorld, eid: number): any
}

export function defineEntityExtension<T extends EntityComposable>(cb: T) {
    return cb
}
