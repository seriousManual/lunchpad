import React from 'react'

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
            border: '3px solid #666',
            transition: 'background-color 100ms linear'
        }

        if (round) {
            style.borderRadius = (size / 2) + 'px'
        }

        return <div style={style} onClick={onSelect}></div>;
    }
}