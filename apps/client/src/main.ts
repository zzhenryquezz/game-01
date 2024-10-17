import './style.css'
import { createGameWord } from 'engine/word'

const canvas = document.getElementById('game') as HTMLCanvasElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const game = createGameWord(canvas)

game.start()
