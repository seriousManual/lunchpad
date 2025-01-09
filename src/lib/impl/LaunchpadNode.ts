import {Input, Output} from 'midi'

import LaunchpadMidi from './LaunchpadMidi'

class LaunchpadNode extends LaunchpadMidi {
    constructor(input: Input, private output: Output) {
        super()

        input.on('message', (deltaTime, message) => {
            this._handleMidiMessage(message)
        })
    }

    _send(order: number, note: number, velocity: number) {
        this.output.sendMessage([order, note, velocity])
    }
}

export default LaunchpadNode