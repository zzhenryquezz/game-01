import { addComponent } from 'bitecs'
import Sprite from '../components/Sprite'
import { defineEntityExtension } from './defineEntityComposable'
import { encode } from './helpers'

interface UpdateOptions {
    src: string

    x: number
    y: number

    width: number
    height: number

    flipX: boolean
    flipY: boolean
}

interface MakeFramesPayload {
    startX: number
    startY: number

    width: number
    height: number

    count: number
}

export function makeFrames(payload: MakeFramesPayload) {
    const frames = [] as { x: number; y: number }[]

    for (let i = 0; i < payload.count; i++) {
        const x = (payload.startX + i) * payload.width
        const y = payload.startY * payload.height

        frames.push({ x, y })
    }

    console.log(frames)

    return frames
}

export function makeSprite(eid: number) {
    const sprite = {
        update(options?: Partial<UpdateOptions>) {
            if (options?.src) {
                Sprite.src[eid] = encode(options.src)
            }

            if (options?.x) {
                Sprite.x[eid] = options.x
            }

            if (options?.y) {
                Sprite.y[eid] = options.y
            }

            if (options?.width) {
                Sprite.width[eid] = options.width
            }

            if (options?.height) {
                Sprite.height[eid] = options.height
            }

            if (options?.flipX !== undefined) {
                Sprite.flipX[eid] = options.flipX ? 1 : 0
            }
        },
    }

    return sprite
}

export const useSprite = defineEntityExtension((world, eid) => {
    addComponent(world, Sprite, eid)

    return {
        sprite: makeSprite(eid),
    }
})
