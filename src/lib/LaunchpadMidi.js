const debug = require('debug');

const LaunchpadBase = require('./LaunchpadBase');

class LaunchpadMidi extends LaunchpadBase {
    constructor(input, output) {
        super()

        this._input = input
        this._output = output
        this._debug = debug('lp:launchpadMidi')

        this._input.onmidimessage = event => this._handleMidiMessage(event)
    }

    _setSquare(x, y, color) {
        this._send(144, this._getSquareCoordinate(x, y), color.getCode())
    }

    _setFunctionX(x, color) {
        this._send(176, this._getFunctionXCoordinate(x), color.getCode())
    }

    _setFunctionY(y, color) {
        this._send(144, this._getFunctionYCoordinate(y), color.getCode())
    }

    _send (order, note, velocity) {
        throw Error('missing _send implementation')
    }

    _handleMidiMessage (message) {
        this._debug('handling message', message)

        if (message[2] < 127) {
            return
        }

        if (message[0] === 176) {
            this._selectFunctionX(message[1] - 104)
        } else {
            let x = message[1] % 16
            let y = parseInt(message[1] / 16) * -1 + 7

            if (x === 8) {
                this._selectFunctionY(y)
            } else {
                this._selectSquare(x, y)
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

module.exports = LaunchpadMidi;