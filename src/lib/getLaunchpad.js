export default function getLaunchpad(midiAccess) {
    let lpInput = null
    let lpOutput = null

    for (let input of midiAccess.inputs.values()) {
        if (input.name === 'Launchpad Mini') {
            lpInput = input
        }
    }

    for (let output of midiAccess.outputs.values()) {
        if (output.name === 'Launchpad Mini') {
            lpOutput = output
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