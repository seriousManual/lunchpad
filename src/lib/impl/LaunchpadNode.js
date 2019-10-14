const LaunchpadMidi = require('./LaunchpadMidi');

class LaunchpadNode extends LaunchpadMidi {
    constructor(input, output) {
        super(input, output)

        this._input.on('message', (deltaTime, message) => {
            this._handleMidiMessage(message)
        })
    }

    _send(order, note, velocity) {
        this._output.sendMessage([order, note, velocity])
    }
}

module.exports = LaunchpadNode;