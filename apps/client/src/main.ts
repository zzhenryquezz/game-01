import './style.css'
import { createGame } from 'engine/game'
import { createEntity } from 'engine/utils/createEntity'

import { useSprite } from 'engine/utils/sprite'
import { useAnimation } from 'engine/utils/animation'
import { useKeymap } from 'engine/utils/keymap'
import { usePhysic } from 'engine/utils/physic'

const canvas = document.getElementById('game') as HTMLCanvasElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const game = createGame(canvas)

const player = createEntity(game.word, [useSprite, useAnimation, useKeymap, usePhysic])

player.sprite.update({
    src: '/player.png',
    width: 32,
    height: 32,
})

player.physic.setPosition(100, 100)

player.animation.add({
    name: 'idle',
    speed: 12,
    frames: [
        { x: 4 * 32, y: 3 * 38 },
        { x: 5 * 32, y: 3 * 38 },
        { x: 6 * 32, y: 3 * 38 },
    ],
})

player.animation.add({
    name: 'walk',
    speed: 4,
    frames: [
        { x: 0, y: 0 },
        { x: 1 * 32, y: 0 },
        { x: 2 * 32, y: 0 },
        { x: 3 * 32, y: 0 },
        { x: 4 * 32, y: 0 },
        { x: 5 * 32, y: 0 },
        { x: 6 * 32, y: 0 },
        { x: 7 * 32, y: 0 },
    ],
})

player.animation.play('idle')

player.keymap.add({
    keys: ['ArrowLeft'],
    onKeydown: () => {
        player.animation.play('walk')
        player.sprite.update({ flipX: true })
        player.physic.move(-1, 0)
    },
    onKeyup: () => {
        player.animation.play('idle')
        player.physic.move(0, 0)
    },
})

player.keymap.add({
    keys: ['ArrowRight'],
    onKeydown: () => {
        player.animation.play('walk')
        player.sprite.update({ flipX: false })
        player.physic.move(1, 0)
    },
    onKeyup: () => {
        player.animation.play('idle')
        player.physic.move(0, 0)
    },
})

game.start()
