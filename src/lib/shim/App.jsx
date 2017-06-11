import React from 'react'

import Square from './Square.jsx'
import FunctionButton from './FunctionButton.jsx'

export default class App extends React.Component {
    render () {
        let {baseData, selectFunctionX, selectFunctionY, selectSquare} = this.props

        let inputX = baseData.inputX.map((color, x) =>
            <FunctionButton color={color} key={x} onSelect={_ => selectFunctionX(x)}/>
        )

        let rows = []
        for (let y = 7; y >= 0; y--) {
            let row = []
            for (let x = 0; x < 8; x++) {
                row.push(<Square key={x + '_' + y}
                                 color={baseData.squares[x][y]}
                                 onSelect={_ => selectSquare(x, y)}
                />)
            }

            row.push(<FunctionButton key={y}
                                     color={baseData.inputY[y]}
                                     onSelect= {_ => selectFunctionY(y)}
            />)

            rows.push(<div className="clearfix" key={y}>{row}</div>)
        }

        return (
            <div>
                <div className="clearfix">{inputX}</div>
                {rows}
            </div>
        );
    }
}