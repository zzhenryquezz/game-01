import { defineEntityExtension } from './defineEntityComposable'

interface Observer {
    keys: string[]
    onKeydown: () => void
    onKeyup: () => void
}

const observers: Observer[] = []

window.addEventListener('keydown', (e) => {
    observers
        .filter((observer) => observer.keys.includes(e.key))
        .forEach((observer) => observer.onKeydown())
})

window.addEventListener('keyup', (e) => {
    observers
        .filter((observer) => observer.keys.includes(e.key))
        .forEach((observer) => observer.onKeyup())
})

export const useKeymap = defineEntityExtension(() => {
    const keymap = {
        add: (payload: Observer) => {
            observers.push(payload)
        },
    }

    return {
        keymap,
    }
})
