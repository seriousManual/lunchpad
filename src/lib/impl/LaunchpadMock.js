const debug = require('debug')

const Color = require('../Color')
const LaunchpadBase = require('../LaunchpadBase')

const mockDebug = debug('lp:mock')

class Mock extends LaunchpadBase {
    constructor() {
        super()

        this.pad = [
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, null],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
        ]
    }

    _setSquare(x, y, color) {
        mockDebug('setSquare', x, y, color);
        this.pad[-1 * y + 8][x] = color;
    }

    _setFunctionX(x, color) {
        mockDebug('setFunctionX', x, color);
        this.pad[0][x] = color;
    }

    _setFunctionY(y, color) {
        mockDebug('setFunctionY', y, color);
        this.pad[-1 * y + 8][8] = color;
    }

    _flush() {
        this.emit('draw');
    }
}

module.exports = Mock