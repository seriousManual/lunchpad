import initialize from './lib/initialize'

import floodfill from './scenarios/floodfill'

initialize().then(launchpad => floodfill(launchpad), error => console.log('man....', error))