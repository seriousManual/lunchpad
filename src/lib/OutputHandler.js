const Emitter = require('events').EventEmitter

const Color = require('./Color')

class OutputHandler extends Emitter {
    constructor (output) {
        super()

        this._output = output

        this._squares = this._generateBlankSquares()
        this._inputX = [new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0)]
        this._inputY = [new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0)]

        this._updateBoard(this._squares, this._inputX, this._inputY, false)
    }

    clearSquares() {
        this._updateBoard(this._generateBlankSquares())
    }

    setSquare (x, y, color) {
        this._squares[x][y] = color
        this._send(144, this._getSquareCoordinate(x, y), color.getCode())
    }

    setFunctionX(x, color) {
        this._inputX[x] = color
        this._send(176, this._getFunctionXCoordinate(x), color.getCode())
    }

    setFunctionY(y, color) {
        this._inputY[y] = color
        this._send(144, this._getFunctionYCoordinate(y), color.getCode())
    }

    _send (order, note, velocity) {
        this._output.send([order, note, velocity])
    }

    _updateBoard (squares, inputX = null, inputY = null, diffUpdate = true) {
        for (let x = 0; x < squares.length; x++) {
            for (let y = 0; y < squares[x].length; y++) {
                var color = squares[x][y]

                if (!diffUpdate || this._squares[x][y].getCode() !== color.getCode()) {
                    this.setSquare(x, y, color)
                }
            }
        }

        this._squares = squares;

        if (inputX) {
            for (let x = 0; x < inputX.length; x++) {
                if (!diffUpdate || this._inputX[x].getCode() !== inputX[x].getCode()) {
                    this.setFunctionX(x, inputX[x])
                }
            }

            this._inputX = inputX
        }

        if (inputY) {
            for (let y = 0; y < inputY.length; y++) {
                if (!diffUpdate || this._inputY[y].getCode() !== inputY[y].getCode()) {
                    this.setFunctionY(y, inputY[y])
                }
            }

            this._inputY = inputY
        }
    }

    _getFunctionXCoordinate (x) {
        return x + 104;
    }

    _getFunctionYCoordinate (y) {
        return this._getSquareCoordinate(8, y)
    }

    _getSquareCoordinate (x, y) {
        return (((y - 7) * -1) * 16) + x
    }

    _generateBlankSquares () {
        let squares = []
        for (var x = 0; x < 8; x++) {
            let row = []
            for (var y = 0; y < 8; y++) {
                row.push(new Color(0, 0))
            }
            squares.push(row)
        }

        return squares
    }

}

module.exports = OutputHandler