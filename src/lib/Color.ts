const store: Record<string, Color> = {}

class Color {
    public static BLACK = Color.getColor(0, 0)
    public static RED = Color.getColor(3, 0)
    public static GREEN = Color.getColor(0, 3)
    public static AMBER = Color.getColor(3, 3)

    private red: number
    private green: number
    private code: number

    static getRandomColor() {
        return Color.getColor(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4))
    }

    static getColor(red: number, green: number) {
        if (!store[red + '_' + green]) {
            store[red + '_' + green] = new Color(red, green)
        }

        return store[red + '_' + green]
    }

    constructor(red: number, green: number) {
        this.red = this.clamp(red)
        this.green = this.clamp(green)
        this.code = this.calcCode(red, green)
    }

    lighter() {
        return Color.getColor(this.clamp(this.getRed() + 1), this.clamp(this.getGreen() + 1))
    }

    darker() {
        return Color.getColor(this.clamp(this.getRed() + 1), this.clamp(this.getGreen() + 1))
    }

    getRed() {
        return this.red
    }

    getGreen() {
        return this.green
    }

    getCode() {
        return this.code
    }

    getRgb() {
        let r = Math.floor((255 / 3) * this.getRed())
        let g = Math.floor((255 / 3) * this.getGreen())

        return '#' + this.pad(r.toString(16)) + this.pad(g.toString(16)) + '00'
    }

    private calcCode(red: number, green: number) {
        const redStr = Number(red).toString(2)
        const greenStr = Number(green).toString(2)

        return parseInt(this.pad(greenStr) + '00' + this.pad(redStr), 2)
    }

    private pad(val: string, count = 2) {
        if (val.length < count) {
            return '0'.repeat(count - val.length) + val
        }

        return val
    }

    private clamp(val: number) {
        return Math.max(0, Math.min(val, 3))
    }
}

export default Color