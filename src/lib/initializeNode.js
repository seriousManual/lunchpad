const LaunchpadNode = require('./LaunchpadNode');

function initializeNode(launchpadNumber = 1) {
    return new Promise(resolve=> {
        let {input, output} = _getLaunchpadNode(launchpadNumber)
        resolve(new LaunchpadNode(input, output))
    })
}

function _getLaunchpadNode(launchpadNumber) {
    const midi = require('midi')
    const input = new midi.input()
    const output = new midi.output()

    let lpInput = null
    let lpOutput = null

    let inputsFound = 0
    let outputsFound = 0

    for (let i = 0; i < input.getPortCount(); i++) {
        if (input.getPortName(i).indexOf('Launchpad Mini') >= 0) {
            inputsFound++

            if(inputsFound < launchpadNumber)
                continue;

            input.openPort(i)
            lpInput = input
            break
        }
    }

    for (let i = 0; i < output.getPortCount(); i++) {
        if (output.getPortName(i).indexOf('Launchpad Mini') >= 0) {
            outputsFound++

            if(outputsFound < launchpadNumber)
                continue;

            output.openPort(i)
            lpOutput = output
            break
        }
    }

    if(inputsFound == 0 || outputsFound == 0){
        throw new Error('no launchpad found')
    }

    if (!lpInput || !lpOutput) {
        throw new Error('no launchpad for that device number found')
    }

    return {
        input: lpInput,
        output: lpOutput
    }
}

module.exports = initializeNode;