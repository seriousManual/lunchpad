import debug from 'debug'
import {EventEmitter} from 'events'

import Color from './Color'
import generateBlankSquare from './generateBlankSquare'

export default class Launchpad extends EventEmitter {
    constructor(input, output) {
        super()

        this._input = input
        this._output = output

        this._debug = debug('lp:launchpad')
        this._squares = generateBlankSquare(Color.BLACK)
        this._inputX = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
        this._inputY = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]

        this.updateBoard(this._squares, this._inputX, this._inputY)

        this._input.onmidimessage = event => this._handleMidiMessage(event)
    }

    clearSquares() {
        this.updateBoard(generateBlankSquare(Color.BLACK))
    }

    getSquare(x, y) {
        return this._squares[x][y]
    }

    setSquare (x, y, color) {
        this._squares[x][y] = color
        this._send(144, this._getSquareCoordinate(x, y), color.getCode())

        return this
    }

    getFunctionX(x) {
        return this._inputX[x]
    }

    setFunctionX(x, color) {
        this._inputX[x] = color
        this._send(176, this._getFunctionXCoordinate(x), color.getCode())

        return this
    }

    getFunctionY(y) {
        return this._inputY[y]
    }

    setFunctionY(y, color) {
        this._inputY[y] = color
        this._send(144, this._getFunctionYCoordinate(y), color.getCode())

        return this
    }

    updateBoard (squares, inputX = null, inputY = null) {
        if (squares) {
            for (let x = 0; x < squares.length; x++) {
                for (let y = 0; y < squares[x].length; y++) {
                    let color = squares[x][y]

                    if (!color) continue

                    if (this._squares[x][y].getCode() !== color.getCode()) {
                        this.setSquare(x, y, color)
                    }
                }
            }

            this._squares = squares;
        }

        if (inputX) {
            for (let x = 0; x < inputX.length; x++) {
                let color = inputX[x]

                if (!color) continue

                if (this._inputX[x].getCode() !== color.getCode()) {
                    this.setFunctionX(x, color)
                }
            }

            this._inputX = inputX
        }

        if (inputY) {
            for (let y = 0; y < inputY.length; y++) {
                let color = inputY[y]

                if (!color) continue

                if (this._inputY[y].getCode() !== color.getCode()) {
                    this.setFunctionY(y, color)
                }
            }

            this._inputY = inputY
        }

        return this
    }

    _send (order, note, velocity) {
        this._debug('sending', [order, note, velocity])
        this._output.send([order, note, velocity])
    }

    _handleMidiMessage (event) {
        if (event.data[2] < 127) {
            return
        }

        if (event.data[0] === 176) {
            this.emit('functionX', event.data[1] - 104)
        } else {
            let x = event.data[1] % 16
            let y = parseInt(event.data[1] / 16) * -1 + 7

            if (x === 8) {
                this.emit('functionY', y)
            } else {
                this.emit('input', x, y)
            }
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
}