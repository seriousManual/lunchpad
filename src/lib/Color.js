class Color {
    constructor(red, green) {
        red = this._clip(red)
        green = this._clip(green)

        this._red = red
        this._green = green
    }

    getRed() {
        return this._red
    }

    getGreen() {
        return this._green
    }

    getCode() {
        let red = Number(this._red).toString(2)
        let green = Number(this._green).toString(2)

        return parseInt(this._pad(green) + '00' + this._pad(red), 2)
    }

    _pad(val, count = 2) {
        if (val.length < count) {
            return '0'.repeat(count - val.length) + val
        }

        return val
    }

    _clip(val) {
        return Math.max(0, Math.min(val, 3))
    }
}

module.exports = Color