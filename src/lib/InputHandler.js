const Emitter = require('events').EventEmitter

class InputHandler extends Emitter {
    constructor (input) {
        super()

        this._input = input

        this._input.onmidimessage = event => this._handle(event)
    }

    _handle (event) {
        if (event.data[2] < 127) {
            return
        }

        if (event.data[0] === 176) {
            this._triggerFunctionX(event.data[1] - 104)
        } else {
            let x = event.data[1] % 16
            let y = parseInt(event.data[1] / 16) * -1 + 7

            if (x === 8) {
                this._triggerFunctionY(y)
            } else {
                this._triggerInput(x, y)
            }
        }
    }

    _triggerFunctionX (x) {
        this.emit('functionX', x)
    }

    _triggerFunctionY(y) {
        this.emit('functionY', y)
    }

    _triggerInput(x, y) {
        this.emit('input', x, y)
    }
}

module.exports = InputHandler