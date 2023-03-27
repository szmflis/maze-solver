
export class Step {
    private readonly stepType: string
    private readonly stepDescription: string

    constructor (stepType: string, stepDescription: string) {
        this.stepDescription = stepDescription
        this.stepType = stepType
    }

    getStepDescription () {
        return this.stepDescription
    }

    getStepType () {
        return this.stepType
    }
}
