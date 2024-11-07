import { addComponent, addEntity, IWorld } from 'bitecs'
import Sprite from '../components/Sprite'
import { defineEntityExtension } from './defineEntityComposable'
import { encode } from './helpers'
import Animation from '../components/Animation'

export interface UpdateOptions {}

export interface Frame {
    x: number
    y: number
}

export interface AnimationList {
    name: string
    frames: Frame[]
}

export function makeAnimation(eid: number) {
    const animationList = [] as AnimationList[]

    const composable = {
        add(name: string, frames: Frame[]) {
            animationList.push({ name, frames })
        },
        play(name: string) {
            const index = animationList.findIndex((a) => a.name === name)

            if (index === -1) {
                console.error(`[animation] animation ${name} not found`)
                return
            }

            const animation = animationList[index]

            Animation.state[eid] = index

            animation.frames.forEach((frame, i) => {
                Animation.framesX[eid][i] = frame.x
                Animation.framesY[eid][i] = frame.y
            })

            Animation.framesCount[eid] = animation.frames.length
        },
    }

    return composable
}

export const useAnimation = defineEntityExtension((world, eid) => {
    addComponent(world, Animation, eid)

    return {
        animation: makeAnimation(eid),
    }
})
