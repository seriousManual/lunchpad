const drawing = require('./lib/drawing')
const initialize = require('../dist/node/indexNode').initialize

initialize().then(launchpad => drawing(launchpad))