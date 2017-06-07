import Color from '../lib/Color'
import ff from '../lib/floodfill'
import generateBlankSquare from '../lib/generateBlankSquare'

export default function floodfill(launchpad) {
    launchpad.on('input', (x, y) => start(x, y))

    function start(x, y) {
        let gens = ff({x: x, y: y})
        let color = Color.getColor(parseInt(Math.random() * 3), parseInt(Math.random() * 3))

        function print() {
            if (gens.length === 0) {
                launchpad.updateBoard(generateBlankSquare(Color.BLACK))
                return
            }

            let gen = gens.shift()
            let blank = generateBlankSquare()

            gen.forEach(entry => {
                blank[entry.x][entry.y] = color
            })

            launchpad.updateBoard(blank)

            setTimeout(print, 100)
        }

        print()
    }
}