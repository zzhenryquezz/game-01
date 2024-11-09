import * as b from 'bitecs'
import Action from '../components/Action'
import { defineEntityExtension } from './defineEntityComposable'

interface ActionPayload {
    name: string
    callback: () => void
}

interface Action extends ActionPayload {
    eid: number
    id: number
}

export const registry = [] as Action[]

export const useAction = defineEntityExtension((word: b.IWorld, eid: number) => {
    b.addComponent(word, Action, eid)

    let lastId = 0

    const action = {
        add: (payload: ActionPayload) => {
            registry.push({
                ...payload,
                eid,
                id: lastId++,
            })
        },
        start: (name: string) => {
            const component = Array.from(Action.states[eid])
            const action = registry.find((action) => action.name === name)

            if (!action || component?.includes(action.id)) {
                return
            }

            component.push(action.id)

            Action.states[eid][action.id] = 1
        },
        stop: (name: string) => {
            const component = Action.states[eid]
            const action = registry.find((action) => action.name === name)

            if (!action || !component?.includes(action.id)) {
                return
            }

            Action.states[eid][action.id] = 0
        },
    }

    return {
        action,
    }
})
