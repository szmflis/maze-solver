import { StepStack } from '../../classes/model/StepStack'

export interface StatisticsState {
    readonly stepsHistory: StepStack[]
    readonly alogrithmExecutionStartTime: number
    readonly algorithmExecutionEndTime: number
    readonly measuredAlgorithmExecutionTime: number
}
