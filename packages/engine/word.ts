import { createWorld, pipe } from 'bitecs'
import { createRenderSprite } from './systems/render-sprite'

export function createGameWord(canvas: HTMLCanvasElement) {
    const word = createWorld()
    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('can not get canvas context')

    const pipeline = pipe(createRenderSprite(ctx))

    function start() {
        setInterval(() => pipeline(word), 16)
    }

    return {
        start,
    }
}
