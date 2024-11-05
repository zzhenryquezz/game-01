import { defineQuery, defineSystem, enterQuery, exitQuery } from 'bitecs'
import AnimatedSprite from '../components/AnimatedSprite'
import Position from '../components/Position'
import { decode } from '../utils/helpers'

export function createRenderAnimatedSprite(ctx: CanvasRenderingContext2D) {
    const query = defineQuery([Position, AnimatedSprite])

    function onEnter(eid: number) {
        const x = Position.x[eid]
        const y = Position.y[eid]

        const src = decode(AnimatedSprite.src[eid])
        const width = AnimatedSprite.width[eid]
        const height = AnimatedSprite.height[eid]

        const frameWidth = AnimatedSprite.frameWidth[eid]
        const frameHeight = AnimatedSprite.frameHeight[eid]

        const frameX = AnimatedSprite.frameX[eid]
        const frameY = AnimatedSprite.frameY[eid]

        console.debug('[render] add image', src, {
            eid,
            x,
            y,
            width,
            height,
            frameWidth,
            frameHeight,
        })

        const img = new Image()

        img.src = src

        // error
        img.onerror = () => {
            console.error(`[render] error loading image: ${src}`)
        }

        img.onload = () => {
            ctx.drawImage(
                img,
                frameX,
                frameY,
                frameWidth,
                frameHeight,
                x,
                y,
                frameWidth,
                frameHeight
            )
        }
    }

    function onUpdate(eid: number) {}

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
