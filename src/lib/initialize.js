const InputHandler = require('./InputHandler')
const OutputHandler = require('./OutputHandler')
const getLaunchpad = require('./getLaunchpad')

const Color = require('./Color')

function initialize() {
    return new Promise((resolve, reject) => {
        navigator.requestMIDIAccess().then(function onMIDISuccess (midiAccess) {
            let launchpad = getLaunchpad(midiAccess)

            let inputHandler = new InputHandler(launchpad.input)
            let outputHandler = new OutputHandler(launchpad.output)

            resolve({inputHandler, outputHandler})
        }, reject)
    })
}

module.exports = initialize