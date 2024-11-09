import { defineQuery, defineSystem, enterQuery, exitQuery } from 'bitecs'
import Action from '../components/Action'

import { registry } from '../utils/action'

export function createActionSystem() {
    const query = defineQuery([Action])

    function onEnter(eid: number) {}

    function onUpdate(eid: number) {
        const states = Array.from(Action.states[eid])

        const actions = registry.filter((a) => a.eid === eid)

        for (const action of actions) {
            if (states[action.id] === 1) {
                action.callback()
            }
        }
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
