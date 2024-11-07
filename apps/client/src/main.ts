import './style.css'
import { createGame } from 'engine/game'
import { createEntity } from 'engine/utils/createEntity'

import { usePosition } from 'engine/utils/position'
import { useSprite } from 'engine/utils/sprite'
import { useAnimation } from 'engine/utils/animation'

const canvas = document.getElementById('game') as HTMLCanvasElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const game = createGame(canvas)

const player = createEntity(game.word, [useSprite, useAnimation, usePosition])

player.sprite.update({
    src: '/player.png',
    width: 32,
    height: 32,
})

player.animation.add('idle', [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
])

player.animation.play('idle')

// player.position.move(100, 100)

game.start()
