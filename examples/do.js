const initialize = require('../src/indexNode').initialize
const drawing = require('./lib/drawing')

initialize(1).then(launchpad => drawing(launchpad))
initialize(2).then(launchpad => drawing(launchpad))