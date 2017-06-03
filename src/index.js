const initialize = require('./lib/initialize')
const Color = require('./lib/Color')

let grid = []
let currentColor = new Color(3, 0)

let definitionRed = new Color(3, 0)
let definitionGreen = new Color(0, 3)
let definitionAmber = new Color(3, 3)

initialize().then(handlers => {
    handlers.inputHandler
        .on('input', (x, y) => {
            if (!grid[x]) grid[x] = []

            let newColor = currentColor
            if (grid[x][y] && grid[x][y].getCode() === currentColor.getCode()) {
                newColor = new Color(0, 0)
            }
            grid[x][y] = newColor

            handlers.outputHandler.setSquare(x, y, newColor)
        })
        .on('functionY', y => {
            if (y == 0) {
                grid = []
                handlers.outputHandler.clearSquares()
            }
        })
        .on('functionX', x => {
            if (x === 0) {
                currentColor = new Color((definitionRed.getRed() + 1) % 3 + 1, 0)
                definitionRed = currentColor
            }
            if (x === 1) {
                currentColor = new Color(0, (definitionGreen.getGreen() + 1) % 3 + 1)
                definitionGreen = currentColor
            }
            if (x === 2) {
                currentColor = new Color((definitionAmber.getRed() + 1) % 3 + 1, (definitionAmber.getGreen() + 1) % 3 + 1)
                definitionAmber = currentColor
            }

            handlers.outputHandler.setFunctionX(7, currentColor)
        })

    handlers.outputHandler
        .setFunctionY(0, new Color(3, 0))
        .setFunctionX(0, new Color(3, 0))
        .setFunctionX(1, new Color(0, 3))
        .setFunctionX(2, new Color(3, 3))
        .setFunctionX(7, currentColor)

}, error => console.log('man....', error))