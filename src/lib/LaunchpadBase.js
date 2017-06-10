import debug from 'debug'
import {EventEmitter} from 'events'

import Color from './Color'
import generateBlankSquare from './generateBlankSquare'

export default class LaunchpadBase extends EventEmitter {
    constructor() {
        super()

        this._debug = debug('lp:launchpad')
        this._squares = generateBlankSquare(Color.BLACK)
        this._inputX = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
        this._inputY = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]

        this.updateBoard(this._squares, this._inputX, this._inputY)
    }

    clearSquares() {
        this.updateBoard(generateBlankSquare(Color.BLACK))
    }

    getSquare(x, y) {
        return this._squares[x][y]
    }

    setSquare (x, y, color) {
        this._squares[x][y] = color
        this._setSquare(x, y, color)

        return this
    }

    getFunctionX(x) {
        return this._inputX[x]
    }

    setFunctionX(x, color) {
        this._inputX[x] = color
        this._setFunctionX(x, color)

        return this
    }

    setFunctionY(y, color) {
        this._inputY[y] = color
        this._setFunctionY(y, color)

        return this
    }

    _selectSquare(x, y) {
        this.emit('input', x, y);
    }

    _selectFunctionX(x) {
        this.emit('functionX', x)
    }

    _selectFunctionY(y) {
        this.emit('functionY', y)
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
        }

        if (inputX) {
            for (let x = 0; x < inputX.length; x++) {
                let color = inputX[x]

                if (!color) continue

                if (this._inputX[x].getCode() !== color.getCode()) {
                    this.setFunctionX(x, color)
                }
            }
        }

        if (inputY) {
            for (let y = 0; y < inputY.length; y++) {
                let color = inputY[y]

                if (!color) continue

                if (this._inputY[y].getCode() !== color.getCode()) {
                    this.setFunctionY(y, color)
                }
            }
        }

        return this
    }
}