import { StepStack } from '../../classes/StepStack'

export interface StatisticsState {
    readonly stepsHistory: StepStack[]
    readonly measuredSpeed: number
}
