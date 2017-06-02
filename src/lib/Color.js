class Color {
    constructor(red, green) {
        red = this._clip(red)
        green = this._clip(green)

        this._red = Number(red).toString(2)
        this._green = Number(green).toString(2)
    }

    getCode() {
        return parseInt(this._pad(this._green) + '00' + this._pad(this._red), 2)
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