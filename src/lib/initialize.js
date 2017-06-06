const InputHandler = require('./InputHandler')
const OutputHandler = require('./OutputHandler')
const getLaunchpad = require('./getLaunchpad')

const Color = require('./Color')

function initialize() {
    return new Promise((resolve, reject) => {
        navigator.requestMIDIAccess().then(function onMIDISuccess (midiAccess) {
            try {
                var handlers = getLaunchpad(midiAccess)
            } catch (error) {
                return reject(error)
            }

            let inputHandler = new InputHandler(handlers.input)
            let outputHandler = new OutputHandler(handlers.output)

            resolve({inputHandler, outputHandler})
        }, reject)
    })
}

module.exports = initialize