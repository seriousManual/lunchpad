import Launchpad from './Launchpad'
import getLaunchpad from './getLaunchpad'

export default function initialize() {
    return new Promise((resolve, reject) => {
        if (!navigator.requestMIDIAccess) {
            return reject(new Error('browser does not support requestMIDIAccess'))
        }

        navigator.requestMIDIAccess().then(function onMIDISuccess (midiAccess) {
            try {
                var handlers = getLaunchpad(midiAccess)
            } catch (error) {
                return reject(error)
            }

            resolve(new Launchpad(handlers.input, handlers.output))
        }, reject)
    })
}