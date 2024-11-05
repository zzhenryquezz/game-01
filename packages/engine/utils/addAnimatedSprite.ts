import * as b from 'bitecs'
import AnimatedSprite from '../components/AnimatedSprite'
import { encode } from '../utils/helpers'

export function mount() {}

export function addAnimatedSprite(word: b.IWorld, eid: number) {
    b.addComponent(word, AnimatedSprite, eid)

    const animatedSprite = {
        setSrc: (src: string) => {
            AnimatedSprite.src[eid] = encode(src)

            return animatedSprite
        },
        setSize: (width: number, height: number) => {
            AnimatedSprite.width[eid] = width
            AnimatedSprite.height[eid] = height

            return animatedSprite
        },
        setFrameSize: (frameWidth: number, frameHeight: number) => {
            AnimatedSprite.frameWidth[eid] = frameWidth
            AnimatedSprite.frameHeight[eid] = frameHeight

            return animatedSprite
        },
        setFramePosition: (frameX: number, frameY: number) => {
            AnimatedSprite.frameX[eid] = frameX
            AnimatedSprite.frameY[eid] = frameY

            return animatedSprite
        },
    }

    return {
        animatedSprite,
    }
}
