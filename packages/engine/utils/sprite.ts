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
