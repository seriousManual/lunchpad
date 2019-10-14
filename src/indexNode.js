const initialize = require('./lib/initializeNode')
const Color = require('./lib/Color')
const Mock = require('./lib/impl/LaunchpadMock')
const Bridge = require('./lib/impl/LaunchpadBridge')

module.exports = {
    initialize, 
    Color,
    Mock,
    Bridge
};