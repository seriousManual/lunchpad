const Color = require('./Color')

function generateBlankSquares () {
    let squares = []
    for (var x = 0; x < 8; x++) {
        let row = []
        for (var y = 0; y < 8; y++) {
            row.push(Color.getColor(0, 0))
        }
        squares.push(row)
    }

    return squares
}

module.exports = generateBlankSquares