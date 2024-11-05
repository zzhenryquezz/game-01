import './style.css'
import { createGame } from 'engine/game'
import { addAnimatedSprite } from 'engine/utils/addAnimatedSprite'
import { addPosition } from 'engine/utils/addPosition'
import { createEntity } from 'engine/utils/createEntity'

const canvas = document.getElementById('game') as HTMLCanvasElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const game = createGame(canvas)

const player = createEntity(game.word, [addAnimatedSprite, addPosition])

player.animatedSprite
    .setSrc('/player.png')
    .setFrameSize(32, 32)
    .setFramePosition(0, 5 * 32)

player.position.move(100, 100)

game.start()
