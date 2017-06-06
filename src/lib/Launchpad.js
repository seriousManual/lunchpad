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
        this._squares = generateBlankSquare()
        this._inputX = [new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0)]
        this._inputY = [new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0), new Color(0, 0)]

        this.updateBoard(this._squares, this._inputX, this._inputY, false)

        this._input.onmidimessage = event => this._handleMidiMessage(event)
    }

    clearSquares() {
        this.updateBoard(generateBlankSquare())
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

    updateBoard (squares, inputX = null, inputY = null, diffUpdate = true) {
        if (squares) {
            for (let x = 0; x < squares.length; x++) {
                for (let y = 0; y < squares[x].length; y++) {
                    let color = squares[x][y]

                    if (!diffUpdate || this._squares[x][y].getCode() !== color.getCode()) {
                        this.setSquare(x, y, color)
                    }
                }
            }

            this._squares = squares;
        }

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