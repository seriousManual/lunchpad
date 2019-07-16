const initialize = require('../src/indexNode').initialize
const drawing = require('./lib/drawing')

initialize(1)
    .then(launchpad => drawing(launchpad))
    .catch(error => {
        throw error
    })