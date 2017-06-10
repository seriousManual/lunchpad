import {initializeShim} from './index'

import drawing from './scenarios/drawing'

initializeShim('launchpadShim').then(launchpad => {
    drawing(launchpad)
}, error => console.log('man....', error))