const LaunchpadBrowser = require('./LaunchpadBrowser')

function initializeBrowser(launchpadNumber = 1) {
    return new Promise((resolve, reject) => {
        if (!navigator.requestMIDIAccess) {
            return reject(new Error('browser does not support requestMIDIAccess'))
        }

        navigator.requestMIDIAccess().then(midiAccess => {
            try {
                const {input, output} = _getLaunchpadBrowser(midiAccess, launchpadNumber)
                const launchpad = new LaunchpadBrowser(input, output)

                launchpad.clearAll()

                resolve(launchpad)
            } catch (error) {
                return reject(error)
            }
        }, reject)
    })
}

function _getLaunchpadBrowser(midiAccess, launchpadNumber) {
    let lpInput = null
    let lpOutput = null

    let inputsFound = 0
    let outputsFound = 0

    for (let input of midiAccess.inputs.values()) {
        if (input.name === 'Launchpad Mini') {
            inputsFound++

            if (inputsFound < launchpadNumber) {
                continue
            }

            lpInput = input
            break
        }
    }

    for (let output of midiAccess.outputs.values()) {
        if (output.name === 'Launchpad Mini') {
            outputsFound++

            if (outputsFound < launchpadNumber) {
                continue
            }

            lpOutput = output
            break
        }
    }

    if (inputsFound == 0 || outputsFound == 0){
        throw new Error('no launchpad found')
    }

    if (!lpInput || !lpOutput) {
        throw new Error(`launchpad #${launchpadNumber} not found`)
    }

    return {
        input: lpInput,
        output: lpOutput
    }
}

module.exports = initializeBrowser