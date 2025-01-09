import Color from "./Color"
import { Board } from "./LaunchpadBase"

function generateBlankSquares (color: Color = Color.BLACK): Board {
    let squares: Board = []
    for (let x = 0; x < 8; x++) {
        let row: Color[] = []
        for (let y = 0; y < 8; y++) {
            row.push(color)
        }
        squares.push(row)
    }

    return squares
}

export default generateBlankSquares