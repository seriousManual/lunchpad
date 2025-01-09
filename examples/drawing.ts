import initialize from '../src/lib/initializeNode'
import drawing from './lib/drawing'


async function run() {
    const lunchpad = await initialize()

    drawing(lunchpad)
    
    process.on('exit', () => {
        lunchpad.clearAll()
    })
}

run()