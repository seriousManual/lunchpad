function getLaunchpad(midiAccess) {
    let lpInput = null
    let lpOutput = null

    for (var input of midiAccess.inputs.values()) {
        if (input.name === 'Launchpad Mini') {
            lpInput = input
        }
    }

    for (var output of midiAccess.outputs.values()) {
        if (input.name === 'Launchpad Mini') {
            lpOutput = output
        }
    }

    if (!lpInput || !lpOutput) {
        throw new Error('no laucnhpad found')
    }

    return {
        input: lpInput,
        output: lpOutput
    }
}

module.exports = getLaunchpad