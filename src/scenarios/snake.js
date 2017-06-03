const debug = require('debug')('lp:snake')

const Color = require('../lib/Color')
const generateBlankSquare = require('../lib/generateBlankSquare')

const DIR_UP = 'up'
const DIR_DOWN = 'down'
const DIR_LEFT = 'left'
const DIR_RIGHT = 'right'

function drawing(handlers) {
    let currentDirection = DIR_DOWN
    let snake = [{x: 5, y: 4}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}]
    let apple = createApple()

    tick()

    function tick() {
        let nextSquare = null
        switch (currentDirection) {
            case DIR_UP:
                nextSquare = {x: snake[0].x, y: snake[0].y + 1}
                break
            case DIR_DOWN:
                nextSquare = {x: snake[0].x, y: snake[0].y - 1}
                break
            case DIR_LEFT:
                nextSquare = {x: snake[0].x - 1, y: snake[0].y}
                break
            case DIR_RIGHT:
                nextSquare = {x: snake[0].x + 1, y: snake[0].y}
                break
        }

        //check for wall collision
        if (nextSquare.x < 0 || nextSquare.x > 7 || nextSquare.y < 0 || nextSquare.y > 7) {
            console.log('bom :(')
            return
        }

        //check for snek collision
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === nextSquare.x && snake[i].y === nextSquare.y) {
                console.log('bom :(')
                return
            }
        }

        let shouldShift = true
        //check for apple collision
        if (nextSquare.x === apple.x && nextSquare.y === apple.y) {
            debug('apple!')
            apple = createApple()
            shouldShift = false
        }

        snake.unshift(nextSquare)
        if (shouldShift) {
            snake.pop()
        }

        print()

        setTimeout(tick, 500)
    }

    function print() {
        let blank = generateBlankSquare()

        snake.forEach((entry, i) => {
            let color = Color.getColor(3, 3)
            if (snake.length === 2) {
                if (i == 0) {
                    color = Color.getColor(3, 3)
                } else {
                    color = Color.getColor(2, 2)
                }
            } else if (snake.length > 2) {
                let value = parseInt(i / 3) * -1 + 3
                color = Color.getColor(value, value)
            }

            blank[entry.x][entry.y] = color
        })

        blank[apple.x][apple.y] = Color.getColor(3, 0)

        handlers.outputHandler.updateBoard(blank)
    }

    function createApple() {
        let apple = null
        while (!apple) {
            apple = {x: parseInt(Math.random() * 8), y: parseInt(Math.random() * 8)}
        }

        return apple
    }

    handlers.inputHandler
        .on('functionY', y => {
            console.log(y);
            
            if (y == 0 && currentDirection !== DIR_UP) { //down
                debug('down')
                currentDirection = DIR_DOWN
            } else if (y == 1 && currentDirection !== DIR_DOWN) {//up
                debug('up')
                currentDirection = DIR_UP
            }
        })
        .on('functionX', x => {
            if (x === 0 && currentDirection !== DIR_RIGHT) { //left
                debug('left')
                currentDirection = DIR_LEFT
            } else if (x === 1 && currentDirection !== DIR_LEFT) { //right
                debug('right')
                currentDirection = DIR_RIGHT
            }
        })

    handlers.outputHandler
        .setFunctionY(0, Color.getColor(1, 1))
        .setFunctionY(1, Color.getColor(1, 1))
        .setFunctionX(0, Color.getColor(1, 1))
        .setFunctionX(1, Color.getColor(1, 1))
}

module.exports = drawing