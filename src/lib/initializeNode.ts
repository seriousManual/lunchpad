import midi, {Input, Output} from 'midi'

import LaunchpadNode from './impl/LaunchpadNode'
import LaunchpadBase from './LaunchpadBase'
import { isLaunchpadPort } from './utility'

function initializeNode(launchpadNumber = 1): Promise<LaunchpadBase> {
    return new Promise((resolve, reject)=> {
        try {
            let {input, output} = getLaunchpadNode(launchpadNumber)

            const launchpad = new LaunchpadNode(input, output)
            launchpad.clearAll()

            resolve(launchpad)
        } catch(error) {
            reject(error)
        }
    })
}

function getLaunchpadNode(launchpadNumber: number) {
    const input = new midi.input()
    const output = new midi.output()

    let lpInput: Input | undefined = undefined
    let lpOutput: Output | undefined = undefined

    let inputsFound = 0
    let outputsFound = 0

    for (let i = 0; i < input.getPortCount(); i++) {
        if (!isLaunchpadPort(input.getPortName(i))) continue

        inputsFound++
        
        if (inputsFound === launchpadNumber) {
            input.openPort(i)
            lpInput = input
            break
        }
    }

    for (let i = 0; i < output.getPortCount(); i++) {
        if (!isLaunchpadPort(output.getPortName(i))) continue

        outputsFound++

        if (outputsFound === launchpadNumber) {
            output.openPort(i)
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

export default initializeNode