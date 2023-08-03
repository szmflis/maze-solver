import { StepStack } from '../../classes/model/StepStack'

export interface StatisticsState {
    readonly stepsHistory: StepStack[]
    readonly measuredSpeed: number
}
