import {EventEmitter} from 'events'

export default class Bridge extends EventEmitter {
    constructor(lp1, lp2) {
        super()

        this._lp1 = lp1
        this._lp2 = lp2

        this._lp1
            .on('input', (x, y) => this.emit('input', x, y))
            .on('functionX', x => this.emit('functionX', x))
            .on('functionY', y => this.emit('functionY', y))

        this._lp2
            .on('input', (x, y) => this.emit('input', x, y))
            .on('functionX', x => this.emit('functionX', x))
            .on('functionY', y => this.emit('functionY', y))
    }

    clearSquares() {
        this._lp1.clearSquares()
        this._lp2.clearSquares()
    }

    getSquare(x, y) {
        return this._lp1.getSquare(x, y)
    }

    setSquare (x, y, color, shouldFlush = true) {
        this._lp1.setSquare(x, y, color, shouldFlush)
        this._lp2.setSquare(x, y, color, shouldFlush)

        return this
    }

    getFunctionX(x) {
        return this._lp1.getFunctionX(x)
    }

    setFunctionX(x, color, shouldFlush = true) {
        this._lp1.setFunctionX(x, color, shouldFlush)
        this._lp2.setFunctionX(x, color, shouldFlush)

        return this
    }

    getFunctionY(y) {
        return this._lp1.getFunctionY(y)
    }

    setFunctionY(y, color, shouldFlush = true) {
        this._lp1.setFunctionY(y, color, shouldFlush)
        this._lp2.setFunctionY(y, color, shouldFlush)

        return this
    }

    updateBoard (squares, functionX = null, functionY = null) {
        this._lp1.updateBoard(squares, functionX, functionY)
        this._lp2.updateBoard(squares, functionX, functionY)

        return this
    }
}
