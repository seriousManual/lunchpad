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
        this._root = document.getElementById(rootId)

        this._baseData = {
            squares: this._squares,
            inputX: this._inputX,
            inputY: this._inputY
        }
        
        this._render()
    }

    _render() {
        console.log('brot');
        
        ReactDOM.render(<App baseData={this._baseData}
                             selectSquare={(x, y) => this._selectSquare(x, y)}
                             selectFunctionX={x => this._selectFunctionX(x)}
                             selectFunctionY={y => this._selectFunctionY(y)}
        />, this._root);
    }

    _setSquare(x, y, color) {
        this._render()
    }

    _setFunctionX(x, color) {
        this._render()
    }

    _setFunctionY(y, color) {
        this._render()
    }
}