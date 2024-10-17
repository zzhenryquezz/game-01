import { defineSystem } from 'bitecs'

export function createRenderSprite(ctx: CanvasRenderingContext2D) {
    return defineSystem((word) => {
        ctx.fillStyle = 'white'
        ctx.fillRect(25, 25, 100, 100)

        return word
    })
}
