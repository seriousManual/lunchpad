const initialize = require('./lib/initialize')

const snake = require('./scenarios/snake')

initialize().then(handlers => {
    snake(handlers)
}, error => console.log('man....', error))