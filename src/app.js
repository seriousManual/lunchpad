import {initializeShim} from './index'

import drawing from './scenarios/drawing'
import ff from './scenarios/floodfill'
import snake from './scenarios/snake'

initializeShim('launchpadShim').then(launchpad => {
    snake(launchpad)
}, error => console.log('man....', error))