import debug from 'debug'

import LaunchpadMidi from './LaunchpadMidi'

export default class LaunchpadNode extends LaunchpadMidi {
    constructor(input, output) {
        super(input, output)

        this._debug = debug('lp:launchpadMidi:Node')

        this._input.on('message', (deltaTime, message) => this._handleMidiMessage(message))
    }

    _send (order, note, velocity) {
        this._debug('sending', [order, note, velocity])
        this._output.sendMessage([order, note, velocity])
    }
}