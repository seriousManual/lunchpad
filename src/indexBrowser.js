const initialize = require('./lib/initializeBrowser');
const Color = require('./lib/Color');
const drawing = require('../examples/lib/drawing');

module.exports = {
    initialize, 
    Color,
    examples: {
        drawing
    }
};