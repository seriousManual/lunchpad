import Launchpad from './Launchpad'

export default function initialize(rootId) {
    return Promise.resolve(new Launchpad(rootId))
}