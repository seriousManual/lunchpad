const LaunchpadBase = require('../LaunchpadBase')

class LaunchpadBridge extends LaunchpadBase {
    constructor(lps) {
        super()

        this._lps = lps

        this._forEachLP(lp => {
            lp.on('input', (x, y) => this.emit('input', x, y))
            lp.on('functionX', x => this.emit('functionX', x))
            lp.on('functionY', y => this.emit('functionY', y))
        })
    }

    clearSquares() {
        super.clearSquares()
        this._forEachLP(lp => lp.clearSquares())
    }

    clearAll() {
        super.clearAll()
        this._forEachLP(lp => lp.clearAll())
    }

    _setSquare(x, y, color) {
        this._forEachLP(lp => lp.setSquare(x, y, color))
    }

    _setFunctionX(x, color) {
        this._forEachLP(lp => lp.setFunctionX(x, color))
    }

    _setFunctionY(y, color) {
        this._forEachLP(lp => lp.setFunctionY(y, color))
    }

    _flush() {
        this._forEachLP(lp => lp.flush())
    }

    _forEachLP(fn, but = null) {
        for (let i = 0; i < this._lps.length; i++) {
            const lp = this._lps[i];

            if (but && but === lp) {
                continue
            }

            fn(this._lps[i])
        }
    }
}

module.exports = LaunchpadBridge