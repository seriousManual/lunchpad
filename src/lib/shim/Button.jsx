import React from 'react'

import Color from '../Color'

export default class Square extends React.Component {
    render () {
        let {color, onSelect, round} = this.props

        let size = 40
        let style = {
            boxSizing: 'border-box',
            backgroundColor: color.getRgb(),
            width: size + 'px',
            height: size + 'px',
            float: 'left',
            margin: '5px',
            border: '3px solid #666'
        }

        if (round) {
            style.borderRadius = (size / 2) + 'px'
        }

        return <div style={style} onClick={onSelect}></div>;
    }
}