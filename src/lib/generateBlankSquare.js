const Color = require('./Color')

function generateBlankSquares (color = Color.getColor(0, 0)) {
    let squares = []
    for (var x = 0; x < 8; x++) {
        let row = []
        for (var y = 0; y < 8; y++) {
            row.push(color)
        }
        squares.push(row)
    }

    return squares
}

module.exports = generateBlankSquares