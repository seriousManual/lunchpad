const initialize = require('./lib/initialize')

const drawing = require('./scenarios/drawing')

initialize().then(handlers => {
    drawing(handlers)
}, error => console.log('man....', error))