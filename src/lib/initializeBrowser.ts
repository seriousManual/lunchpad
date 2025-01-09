import LaunchpadBrowser from './impl/LaunchpadBrowser'
import LaunchpadBase from './LaunchpadBase'
import { isLaunchpadPort } from './utility'

async function initializeBrowser(launchpadNumber = 1): Promise<LaunchpadBase> {
    if (!navigator.requestMIDIAccess) {
        throw new Error('browser does not support requestMIDIAccess')
    }

    const midiAccess = await navigator.requestMIDIAccess()
    
    const {input, output} = getLaunchpadBrowser(midiAccess, launchpadNumber)
    const launchpad = new LaunchpadBrowser(input, output)

    launchpad.clearAll()

    return launchpad
}

function getLaunchpadBrowser(midiAccess: WebMidi.MIDIAccess, launchpadNumber: number) {
    let lpInput = null
    let lpOutput = null

    let inputsFound = 0
    let outputsFound = 0

    for (let input of midiAccess.inputs.values()) {
        if (!isLaunchpadPort(input.name)) continue

        inputsFound++

        if (inputsFound === launchpadNumber) {
            lpInput = input
            break
        }
    }

    for (let output of midiAccess.outputs.values()) {
        if (!isLaunchpadPort(output.name)) continue

        outputsFound++

        if (outputsFound === launchpadNumber) {
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

export default initializeBrowser