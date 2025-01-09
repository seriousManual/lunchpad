import EventEmitter from 'eventemitter3'

import Color from './Color'
import generateBlankSquare from './generateBlankSquare'

export type Board = Color[][]
export type Functions = [Color, Color, Color, Color, Color, Color, Color, Color]

abstract class LaunchpadBase extends EventEmitter {
    private squares = generateBlankSquare(Color.BLACK)
    private functionX: Functions = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
    private functionY: Functions = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]

    abstract _setSquare(x: number, y: number, color: Color): void
    abstract _setFunctionX(x: number, color: Color): void
    abstract _setFunctionY(x: number, color: Color): void
    abstract _flush(): void

    constructor() {
        super()
    }

    clearSquares() {
        this.updateBoard(generateBlankSquare(Color.BLACK))

        return this
    }

    clearAll() {
        this.updateBoard(
            generateBlankSquare(Color.BLACK),
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
        )

        return this
    }

    getSquare(x: number, y: number) {
        return this.squares[x][y]
    }

    setSquare (x: number, y: number, color: Color) {
        this.squares[x][y] = color
        this._setSquare(x, y, color)

        return this
    }

    getFunctionX(x: number) {
        return this.functionX[x]
    }

    setFunctionX(x: number, color: Color) {
        this.functionX[x] = color
        this._setFunctionX(x, color)

        return this
    }

    getFunctionY(y: number) {
        return this.functionX[y]
    }

    setFunctionY(y: number, color: Color) {
        this.functionY[y] = color
        this._setFunctionY(y, color)

        return this
    }

    flush() {
        this._flush();
    }

    _selectSquare(x: number, y: number) {
        this.emit('input', x, y);
    }

    _selectFunctionX(x: number) {
        this.emit('functionX', x)
    }

    _selectFunctionY(y: number) {
        this.emit('functionY', y)
    }

    updateBoard (squares?: Board, functionX?: Functions, functionY?: Functions) {
        if (squares) {
            for (let x = 0; x < squares.length; x++) {
                for (let y = 0; y < squares[x].length; y++) {
                    let color = squares[x][y]
                    if (!color) {
                        continue
                    }

                    this.setSquare(x, y, color)
                }
            }
        }

        if (functionX) {
            for (let x = 0; x < functionX.length; x++) {
                let color = functionX[x]
                if (!color) {
                    continue
                }

                this.setFunctionX(x, color)
            }
        }

        if (functionY) {
            for (let y = 0; y < functionY.length; y++) {
                let color = functionY[y]
                if (!color) {
                    continue
                }

                this.setFunctionY(y, color)
            }
        }

        return this
    }
}

export default LaunchpadBase