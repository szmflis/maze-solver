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

    getSteps () {
        return this.steps
    }

}
