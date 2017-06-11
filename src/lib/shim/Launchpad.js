import React from 'react'
import ReactDOM from 'react-dom'
import debug from 'debug'
import {EventEmitter} from 'events'

import Color from '../Color'
import LaunchpadBase from '../LaunchpadBase'

import App from './App.jsx'

export default class Launchpad extends LaunchpadBase {
    constructor(rootId) {
        super()

        this._debug = debug('lp:launchpadShim')
        this._rootNode = document.getElementById(rootId)

        this._baseData = {
            squares: this._squares,
            inputX: this._inputX,
            inputY: this._inputY
        }
        
        this._render()
    }

    _render() {
        this._debug('render')
        
        ReactDOM.render(<App baseData={this._baseData}
                             selectSquare={(x, y) => this._selectSquare(x, y)}
                             selectFunctionX={x => this._selectFunctionX(x)}
                             selectFunctionY={y => this._selectFunctionY(y)}
        />, this._rootNode);
    }

    _setSquare(x, y, color) {}

    _setFunctionX(x, color) {}

    _setFunctionY(y, color) {}

    _flush() {
        this._render()
    }
}