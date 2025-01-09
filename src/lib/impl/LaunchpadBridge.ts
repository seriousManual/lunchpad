import Color from '../../lib/Color'
import LaunchpadBase from '../LaunchpadBase'

class LaunchpadBridge extends LaunchpadBase {
    private launchpads: LaunchpadBase[] = []

    constructor(launchpads: LaunchpadBase[]) {
        super()

        this.launchpads = launchpads

        this._forEachLP(lp => {
            lp.on('input', (x, y) => this.emit('input', x, y))
            lp.on('functionX', x => this.emit('functionX', x))
            lp.on('functionY', y => this.emit('functionY', y))
        })
    }

    clearSquares() {
        super.clearSquares()
        this._forEachLP(lp => lp.clearSquares())

        return this
    }

    clearAll() {
        super.clearAll()
        this._forEachLP(lp => lp.clearAll())

        return this
    }

    _setSquare(x: number, y: number, color: Color) {
        this._forEachLP(lp => lp.setSquare(x, y, color))
    }

    _setFunctionX(x: number, color: Color) {
        this._forEachLP(lp => lp.setFunctionX(x, color))
    }

    _setFunctionY(y: number, color: Color) {
        this._forEachLP(lp => lp.setFunctionY(y, color))
    }

    _flush() {
        this._forEachLP(lp => lp.flush())
    }

    _forEachLP(fn: (launchpad: LaunchpadBase) => void) {
        for (let i = 0; i < this.launchpads.length; i++) {
            fn(this.launchpads[i])
        }
    }
}

export default LaunchpadBridge