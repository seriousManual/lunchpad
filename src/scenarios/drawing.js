const Color = require('../lib/Color')

function drawing(handlers) {
    let currentColor = Color.getColor(3, 0)

    let definitionRed = Color.getColor(3, 0)
    let definitionGreen = Color.getColor(0, 3)
    let definitionAmber = Color.getColor(3, 3)

    handlers.inputHandler
        .on('input', (x, y) => {
            let newColor = currentColor
            if (handlers.outputHandler.getSquare(x, y).getCode() === newColor.getCode()) {
                newColor = Color.getColor(0, 0)
            }

            handlers.outputHandler.setSquare(x, y, newColor)
        })
        .on('functionY', y => {
            if (y == 0) {
                handlers.outputHandler.clearSquares()
            }
        })
        .on('functionX', x => {
            if (x === 0) {
                currentColor = Color.getColor((definitionRed.getRed() + 1) % 3 + 1, 0)
                definitionRed = currentColor
            } else if (x === 1) {
                currentColor = Color.getColor(0, (definitionGreen.getGreen() + 1) % 3 + 1)
                definitionGreen = currentColor
            } else if (x === 2) {
                currentColor = Color.getColor((definitionAmber.getRed() + 1) % 3 + 1, (definitionAmber.getGreen() + 1) % 3 + 1)
                definitionAmber = currentColor
            }

            handlers.outputHandler.setFunctionX(7, currentColor)
        })

    handlers.outputHandler
        .setFunctionY(0, Color.getColor(3, 0))
        .setFunctionX(0, Color.getColor(3, 0))
        .setFunctionX(1, Color.getColor(0, 3))
        .setFunctionX(2, Color.getColor(3, 3))
        .setFunctionX(7, currentColor)
}

module.exports = drawing