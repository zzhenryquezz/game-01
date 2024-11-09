import './style.css'
import { createGame } from 'engine/game'
import { createEntity } from 'engine/utils/createEntity'

import { usePosition } from 'engine/utils/position'
import { useSprite } from 'engine/utils/sprite'
import { useAnimation } from 'engine/utils/animation'
import { useKeymap } from 'engine/utils/keymap'
import { useAction } from 'engine/utils/action'

const canvas = document.getElementById('game') as HTMLCanvasElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const game = createGame(canvas)

const player = createEntity(game.word, [useSprite, useAnimation, usePosition, useKeymap, useAction])

player.sprite.update({
    src: '/player.png',
    width: 32,
    height: 32,
})

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

player.action.add({
    name: 'left',
    callback: () => {
        player.position.move(1, 0)
    },
})

player.action.add({
    name: 'right',
    callback: () => {},
})

player.keymap.add({
    keys: ['ArrowLeft'],
    onKeydown: () => {
        player.animation.play('walk')
        player.sprite.update({ flipX: true })
    },
    onKeyup: () => {
        player.animation.play('idle')
    },
})

player.keymap.add({
    keys: ['ArrowRight'],
    onKeydown: () => {
        player.animation.play('walk')
        player.sprite.update({ flipX: false })
    },
    onKeyup: () => {
        player.animation.play('idle')
    },
})

game.start()
