import initialize from './lib/initialize'

import floodfill from './scenarios/floodfill'
import drawing from './scenarios/drawing'
import snake from './scenarios/snake'

initialize().then(launchpad => {
    snake(launchpad)
}, error => console.log('man....', error))