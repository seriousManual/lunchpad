const initialize = require('./lib/initializeBrowser');
const Color = require('./lib/Color');
const drawing = require('../examples/lib/drawing');
const Mock = require('./lib/impl/LaunchpadMock')
const Bridge = require('./lib/impl/LaunchpadBridge')

module.exports = {
    initialize, 
    Color,
    examples: {
        drawing
    },
    Mock,
    Bridge
};