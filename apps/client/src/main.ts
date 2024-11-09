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
    frames: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
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
    callback: () => {
        player.position.move(1, 0)
    },
})

player.keymap.add({
    keys: ['ArrowLeft'],
    onKeydown: () => {
        console.log('start moving right')
    },
    onKeyup: () => {
        console.log('stop moving right')
    },
})

player.keymap.add({
    keys: ['ArrowRight'],
    onKeydown: () => {
        console.log('start moving right')
    },
    onKeyup: () => {
        console.log('stop moving right')
    },
})

const enemy = createEntity(game.word, [useSprite, useAnimation, usePosition])

enemy.sprite.update({
    src: '/enemy-01.png',
    width: 32,
    height: 32,
})

enemy.position.move(32, 0)

enemy.animation.add({
    name: 'idle',
    speed: 10,
    frames: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
    ],
})

enemy.animation.play('idle')

game.start()
