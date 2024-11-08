import { defineQuery, defineSystem, enterQuery } from 'bitecs'
import Animation from '../components/Animation'
import Sprite from '../components/Sprite'
import { Frame } from '../utils/animation'
import { GameWord } from '../types'

export function createAnimationSystem() {
    let renderCount = 0

    const query = defineQuery([Animation, Sprite])

    function onEnter(eid: number) {
        console.log('[animation] enter', eid)
    }

    function onUpdate(eid: number) {
        const frames: Frame[] = []
        const speed = Animation.speed[eid]
        const count = Animation.framesCount[eid]

        for (let i = 0; i < count; i++) {
            frames.push({
                x: Animation.framesX[eid][i],
                y: Animation.framesY[eid][i],
            })
        }

        const index = Math.floor(renderCount / speed) % count

        const frame = frames[index]

        Sprite.x[eid] = frame.x
    }

    return defineSystem((word: GameWord) => {
        renderCount++

        for (const eid of enterQuery(query)(word)) {
            onEnter(eid)
        }

        for (const eid of query(word)) {
            onUpdate(eid)
        }

        return word
    })
}
