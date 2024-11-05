import * as b from 'bitecs'
import { createRenderSprite } from './systems/render-sprite'
import { createRenderAnimatedSprite } from './systems/render-animated-sprite'

export function createGame(canvas: HTMLCanvasElement) {
    const word = b.createWorld()
    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('can not get canvas context')

    const pipeline = b.pipe(createRenderSprite(ctx), createRenderAnimatedSprite(ctx))

    function start() {
        setInterval(() => pipeline(word), 16)
    }

    function addComponent(e: number, c: b.Component) {
        b.addComponent(word, c, e)
    }

    return {
        word,
        start,
        addComponent,
    }
}
