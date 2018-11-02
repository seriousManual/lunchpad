const LaunchpadNode = require('./LaunchpadNode');

function initializeNode() {
    return new Promise(resolve=> {
        let {input, output} = _getLaunchpadNode()
        resolve(new LaunchpadNode(input, output))
    })
}

function _getLaunchpadNode() {
    const midi = require('midi')
    const input = new midi.input()
    const output = new midi.output()

    let lpInput = null
    let lpOutput = null

    for (let i = 0; i < input.getPortCount(); i++) {
        if (input.getPortName(i).indexOf('Launchpad Mini') >= 0) {
            input.openPort(i)
            lpInput = input
            break
        }
    }

    for (let i = 0; i < output.getPortCount(); i++) {
        if (output.getPortName(i).indexOf('Launchpad Mini') >= 0) {
            output.openPort(i)
            lpOutput = output
            break
        }
    }

    if (!lpInput || !lpOutput) {
        throw new Error('no launchpad found')
    }

    return {
        input: lpInput,
        output: lpOutput
    }
}

module.exports = initializeNode;