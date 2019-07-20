const {initialize, Color} = require('../src/indexNode')
const drawing = require('./lib/drawing');

initialize(1)
    .then(lunchpad => drawing(lunchpad))
    .catch(error => {
        throw error
    })

