import Color from '../lib/Color'
import ff from './lib/floodfill'
import generateBlankSquare from '../lib/generateBlankSquare'

export default function floodfill(launchpad) {
    let cycles = []

    // launchpad.on('input', add)
    
    let position = {x: 0, y: 0}
    setInterval(() => {
        while (true) {
            let rndX = Math.random()
            let rndY = Math.random()
            let newPosition = {
                x: rndX < 0.4 ? position.x - 1 : rndX < 0.8 ? position.x + 1 : position.x,
                y: rndY < 0.4 ? position.y - 1 : rndY < 0.8 ? position.y + 1 : position.y
            }
            
            if (newPosition.x >= 0 && newPosition.x <= 7 && newPosition.y >= 0 && newPosition.y <= 7) {
                position = newPosition
                break
            }
        }

        add(position.x, position.y)
    }, 100)

    function add(x, y) {
        let gens = ff({x: x, y: y})
        gens.color = Color.getRandomColor()

        cycles.push(gens)
    }

    function animationCycle() {
        setTimeout(animationCycle, 100)

        if (cycles.length === 0) return

        let blank = generateBlankSquare(Color.BLACK)
        cycles.forEach(cycle => {
            let gen = cycle.shift()

            gen.forEach(entry => {
                blank[entry.x][entry.y] = cycle.color
            })
        })

        launchpad.updateBoard(blank)

        cycles = cycles.filter(cycle => cycle.length > 0)
    }

    animationCycle()
}