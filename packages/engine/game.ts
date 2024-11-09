import * as b from 'bitecs'
import { createAnimationSystem } from './systems/animation'
import { createRenderSystem } from './systems/render'
import { createActionSystem } from './systems/action'

export function createGame(canvas: HTMLCanvasElement) {
    const word = b.createWorld()

    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('can not get canvas context')

    const pipeline = b.pipe(createRenderSystem(ctx), createAnimationSystem(), createActionSystem())

    function start() {
        setInterval(() => pipeline(word), 16)
    }

    return {
        word,
        start,
    }
}
