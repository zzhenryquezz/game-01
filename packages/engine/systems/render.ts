import { defineQuery, defineSystem, enterQuery, exitQuery } from 'bitecs'
import Position from '../components/Position'
import Sprite from '../components/Sprite'
import { decode } from '../utils/helpers'

export function createRenderSystem(ctx: CanvasRenderingContext2D) {
    const query = defineQuery([Position, Sprite])

    const images = new Map<string, HTMLImageElement>()

    function onEnter(eid: number) {
        const src = decode(Sprite.src[eid])

        console.debug('[render] add image', src)

        const img = new Image()

        img.src = src

        // error
        img.onerror = () => {
            console.error(`[render] error loading image: ${src}`)
        }

        img.onload = () => {
            images.set(src, img)
        }
    }

    function onUpdate(eid: number) {
        const x = Position.x[eid]
        const y = Position.y[eid]

        const src = decode(Sprite.src[eid])

        const image = images.get(src)

        if (!image) return

        const width = Sprite.width[eid]
        const height = Sprite.height[eid]
        const frameX = Sprite.x[eid] * width
        const frameY = Sprite.y[eid] * height

        ctx.drawImage(image, frameX, frameY, width, height, x, y, width, height)
    }

    function onExit(eid: number) {
        const src = decode(Sprite.src[eid])

        console.debug('[render] remove image', src)

        images.delete(src)
    }

    ctx.scale(4, 4)

    return defineSystem((word) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

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
