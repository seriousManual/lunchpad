import React from 'react'

import Button from './Button.jsx'

export default class App extends React.Component {
    render() {
        let {baseData, selectFunctionX, selectFunctionY, selectSquare} = this.props

        let functionX = baseData.functionX.map((color, x) =>
            <Button color={color} key={x} round={true} onSelect={_ => selectFunctionX(x)}/>
        )

        let rows = []
        for (let y = 7; y >= 0; y--) {
            let row = []
            for (let x = 0; x < 8; x++) {
                row.push(<Button key={x + '_' + y}
                                 color={baseData.squares[x][y]}
                                 onSelect={_ => selectSquare(x, y)}
                />)
            }

            row.push(<Button key={y}
                             round={true}
                             color={baseData.functionY[y]}
                             onSelect={_ => selectFunctionY(y)}
            />)

            rows.push(<div className="clearfix" key={y}>{row}</div>)
        }

        return (
            <div>
                <div className="clearfix">{functionX}</div>
                {rows}
            </div>
        );
    }
}