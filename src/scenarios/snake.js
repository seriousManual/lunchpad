const debug = require('debug')('lp:snake')

const Color = require('../lib/Color')
const generateBlankSquare = require('../lib/generateBlankSquare')

const DIR_UP = 'up'
const DIR_DOWN = 'down'
const DIR_LEFT = 'left'
const DIR_RIGHT = 'right'

const STATE_START = 'start'
const STATE_RUNNING = 'running'
const STATE_ERROR = 'error'

function drawing(handlers) {
    let state = STATE_START, currentDirection, snake, apple, delay

    function initiate() {
        state = STATE_RUNNING
        currentDirection = DIR_DOWN
        snake = [Object.assign(_getRandomCoord(), {c: Color.getColor(3, 3)})]
        apple = createApple()
        delay = 500
        tick()
    }

    function handleError() {
        state = STATE_ERROR

        handlers.outputHandler.updateBoard(generateBlankSquare(Color.getColor(3, 0)))
        setTimeout(() => handlers.outputHandler.updateBoard(generateBlankSquare(Color.getColor(0, 0))), 600)
    }

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
            handleError()
            return
        }

        //check for snek collision
        if (_checkSnakeForCollision(snake, nextSquare)) {
            handleError()
            return
        }

        let shouldShift = true
        //check for apple collision
        if (nextSquare.x === apple.x && nextSquare.y === apple.y) {
            apple = createApple()
            shouldShift = false
            delay -= 10
            delay = Math.max(delay, 150)

            debug('apple!', delay)
        }

        let c = null
        do {
            c = Color.getRandomColor()
        } while(c.getCode() === 0)
        nextSquare.c = c

        snake.unshift(nextSquare)
        if (shouldShift) {
            snake.pop()
        }

        print()
        setTimeout(tick, delay)
    }

    function print() {
        let blank = generateBlankSquare()

        snake.forEach((entry, i) => blank[entry.x][entry.y] = entry.c)

        blank[apple.x][apple.y] = Color.getColor(3, 0)

        handlers.outputHandler.updateBoard(blank)
    }

    function createApple() {
        let apple = null
        do {
            apple = _getRandomCoord()
        } while (_checkSnakeForCollision(snake, apple))

        return apple
    }

    handlers.inputHandler
        .on('functionY', y => {
            if (state === STATE_ERROR || state === STATE_START) return initiate()

            if (y == 0 && currentDirection !== DIR_UP) { //down
                debug('down')
                currentDirection = DIR_DOWN
            } else if (y == 1 && currentDirection !== DIR_DOWN) {//up
                debug('up')
                currentDirection = DIR_UP
            }
        })
        .on('functionX', x => {
            if (state === STATE_ERROR || state === STATE_START) return initiate()

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

function _getRandomCoord() {
    return {x: parseInt(Math.random() * 8), y: parseInt(Math.random() * 8)}
}

function _checkSnakeForCollision(snake, coord) {
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === coord.x && snake[i].y === coord.y) {
            return true
        }
    }

    return false
}

module.exports = drawing