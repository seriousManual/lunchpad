# LUNCHPAD

Lunchpad is a interface for the [Novation Launchpad Mini](https://www.thomann.de/de/novation_launchpad_mini_mk2.htm).

<p align="center">
  <img src="https://www.thomann.de/thumb/thumb220x170/pics/prod/366212.jpg" width="250" />
</p>

Lunchpad runs in the browser and on node.js.

## installation

````
npm install lunchpad
````

### dependencies

If you are running this module on node.js, you'll need the additional midi dependency:

````
npm install midi
````

This module also runs on the browser and bring with it a shim for the hardware module that uses React to show a virtual copy of the actual Launchpad in the browser.
If you want to use the shim, you additionally have to install react and react-dom:

````
npm install react react-dom
````

## invocation

### node / browser

````javascript
const launchpad = require('lunchpad')
const Color = launchpad.Color

launchpad.initialize().then(interface =>  {
    //set the color of the coordinate 0/0 (bottom left) to the color Amber
    interface.setSquare(0, 0, Color.getColor(3, 3))

    //register an event handler that will trigger whenever one of the square buttons is pressed
    interface.on('input', (x, y) => console.log(x, y))
}, error => console.log(error))
````

### browser shim

````javascript
const launchpad = require('lunchpad')
const Color = launchpad.Color

//use the function "initializeShim" instead of "initialize"
//the id of the root node the shim should be displayed in has to be assigned
launchpad.initializeShim('myRootNode').then(interface =>  {
    //set the color of the coordinate 0/0 (bottom left) to the color Amber
    interface.setSquare(0, 0, Color.getColor(3, 3))

    //register an event handler that will trigger whenever one of the square buttons is pressed
    interface.on('input', (x, y) => console.log(x, y))
}, error => console.log(error))
````

### bridged

the bridge is a wrapper around the browserShim and the actual hardware interface which mirrors every action on the hardware interface and the browser

````javascript
const launchpad = require('lunchpad')

const Color = launchpad.Color
const initialize = launchpad.initialize
const initializeShim = launchpad.initializeShim
const Bridge = launchpad.Bridge

Promise.all([
    initialize(),
    initialize('myRootNode')
]).then(interfaces => {
    let myBridge = new Bridge(interface[0], interface[1])

    //whenever a square button is pressed light up the exact square
    myBridge.on('input', (x, y) => {
        myBridge.setSquare(x, y, Color.getColor(3, 3))
    })
})
````