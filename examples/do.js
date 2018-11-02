const initialize = require('../src/indexNode').initialize

initialize().then(launchpad => drawing(launchpad))