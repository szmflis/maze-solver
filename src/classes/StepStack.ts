/**
 * ex. 1
 * Found available directions to move to: [{}]
 * Found previously unvisited direction: [{}]
 * Found previously visited direction: [{}]
 * Chosen direction: {}
 * Removing wall to the: {} of current position
 * Setting current position to: {}
 * Moving to position: {}
 * Setting current position to: {}
 * Chosen to carve a path in direction {} to cell {}, that cell becomes the new cell.
 */

/**
 *
 *
 */
import { Step } from './Step'

export class StepStack {
    private steps: Step[]

    constructor () {
        this.steps = []
    }

    addStep (step: Step) {
        this.steps.push(step)
    }

    clearSteps () {
        this.steps = []
    }

}
