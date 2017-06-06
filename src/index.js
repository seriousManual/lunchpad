import initialize from './lib/initialize'

import snake from './scenarios/snake'

initialize().then(launchpad => snake(launchpad), error => console.log('man....', error))