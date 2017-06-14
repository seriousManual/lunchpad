import {initializeShim} from './index'

import drawing from './scenarios/drawing'
import ff from './scenarios/floodfill'
import snake from './scenarios/snake'

// Promise.all([
//     initialize(),
//     initializeShim('launchpadShim')
// ]).then(launchpads => {
//     snake(new Bridge(launchpads[0], launchpads[1]))
// })

initializeShim('launchpadShim').then(ff)