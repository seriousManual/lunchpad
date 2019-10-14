const initialize = require('./lib/initializeBrowser');
const Color = require('./lib/Color');
const drawing = require('../examples/lib/drawing');
const Mock = require('./lib/impl/LaunchpadMock')

module.exports = {
    initialize, 
    Color,
    examples: {
        drawing
    },
    Mock
};