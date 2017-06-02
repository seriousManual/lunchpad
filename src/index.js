const InputHandler = require('./lib/InputHandler')
const OutputHandler = require('./lib/OutputHandler')
const getLaunchpad = require('./lib/getLaunchpad')

const Color = require('./lib/Color')



navigator.requestMIDIAccess().then(function onMIDISuccess (midiAccess) {
    let launchpad = getLaunchpad(midiAccess)

    let inputHandler = new InputHandler(launchpad.input)
    let outputHandler = new OutputHandler(launchpad.output)

    inputHandler
        .on('input', (x, y) => {
            outputHandler.setSquare(x, y, new Color(3, 3))
        })
        .on('functionX', x => console.log(x))
        .on('functionY', y => {
            if (y == 0) {
                outputHandler.clearSquares()
            }
        })

    outputHandler.setFunctionY(0, new Color(0, 3))
});


