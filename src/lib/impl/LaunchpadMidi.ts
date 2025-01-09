import Color from '../../lib/Color'
import LaunchpadBase from '../LaunchpadBase'

export type MidiData = [number, number, number]

class LaunchpadMidi extends LaunchpadBase {
    _setSquare(x: number, y: number, color: Color) {
        this._send(144, this._getSquareCoordinate(x, y), color.getCode())
    }

    _setFunctionX(x: number, color: Color) {
        this._send(176, this._getFunctionXCoordinate(x), color.getCode())
    }

    _setFunctionY(y: number, color: Color) {
        this._send(144, this._getFunctionYCoordinate(y), color.getCode())
    }

    _send(order: number, note: number, velocity: number) {
        throw Error('missing _send implementation')
    }

    _flush() {
        //noop for now
    }

    _handleMidiMessage (message: MidiData) {
        if (message[2] < 127) {
            return
        }

        if (message[0] === 176) {
            this._selectFunctionX(message[1] - 104)
        } else {
            const x = message[1] % 16
            const y = Math.floor(message[1] / 16) * -1 + 7

            if (x === 8) {
                this._selectFunctionY(y)
            } else {
                this._selectSquare(x, y)
            }
        }
    }

    _getFunctionXCoordinate (x: number) {
        return x + 104
    }

    _getFunctionYCoordinate (y: number) {
        return this._getSquareCoordinate(8, y)
    }

    _getSquareCoordinate (x: number, y: number) {
        return (((y - 7) * -1) * 16) + x
    }
}

export default LaunchpadMidi