import LaunchpadMidi, { MidiData } from './LaunchpadMidi'

class LaunchpadBrowser extends LaunchpadMidi {
    constructor(input: any, private output: any) {
        super()

        input.onmidimessage = (event: WebMidi.MIDIMessageEvent) => {
            this._handleMidiMessage(event.data as unknown as MidiData)
        }
    }

    _send(order: number, note: number, velocity: number) {
        this.output.send([order, note, velocity])
    }
}

export default LaunchpadBrowser