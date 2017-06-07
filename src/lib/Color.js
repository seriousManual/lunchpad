const store = {}

export default class Color {
    static getRandomColor() {
        return Color.getColor(parseInt(Math.random() * 4, 10), parseInt(Math.random() * 4, 10))
    }

    static getColor(red, green) {
        if (!store[red + '_' + green]) {
            store[red + '_' + green] = new Color(red, green)
        }

        return store[red + '_' + green]
    }

    constructor(red, green) {
        this._red = this._clamp(red)
        this._green = this._clamp(green)
        this._code = this._calcCode(red, green)
    }

    lighter() {
        return Color.getColor(this._clamp(this.getRed() + 1), this._clamp(this.getGreen() + 1))
    }

    darker() {
        return Color.getColor(this._clamp(this.getRed() + 1), this._clamp(this.getGreen() + 1))
    }

    getRed() {
        return this._red
    }

    getGreen() {
        return this._green
    }

    getCode() {
        return this._code
    }

    _calcCode(red, green) {
        red = Number(red).toString(2)
        green = Number(green).toString(2)

        return parseInt(this._pad(green) + '00' + this._pad(red), 2)
    }

    _pad(val, count = 2) {
        if (val.length < count) {
            return '0'.repeat(count - val.length) + val
        }

        return val
    }

    _clamp(val) {
        return Math.max(0, Math.min(val, 3))
    }
}

Color.BLACK = Color.getColor(0, 0)
Color.RED = Color.getColor(3, 0)
Color.GREEN = Color.getColor(0, 3)
Color.AMBER = Color.getColor(3, 3)