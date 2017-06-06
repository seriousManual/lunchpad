import initialize from './lib/initialize'

import snake from './scenarios/snake'

initialize().then(handlers => snake(handlers), error => console.log('man....', error))