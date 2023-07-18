import { Action, bindActionCreators } from 'redux'
import store from '..'
import { StepStack } from '../../classes/StepStack'

interface AddStepStackAction extends Action<'AddStepStack'> {
    stepStack: StepStack
}

const addStepStack = (stepStack: StepStack): AddStepStackAction => ({
    type: 'AddStepStack',
    stepStack
})

interface ClearStepStackAction extends Action<'ClearStepStack'> {}

const clearStepStack = (): ClearStepStackAction => ({
    type: 'ClearStepStack'
})

interface SetMeasuredExecutionTimeAction extends Action<'SetMeasuredExecutionTime'> {
    measuredExecutionTime: number
}

const setMeasuredExecutionTime = (measuredExecutionTime: number): SetMeasuredExecutionTimeAction => ({
    type: 'SetMeasuredExecutionTime',
    measuredExecutionTime
})

export type StatisticActions = AddStepStackAction
    | ClearStepStackAction
    | SetMeasuredExecutionTimeAction

export const statisticsActionDispatcher = bindActionCreators(
    {
        addStepStack,
        clearStepStack,
        setMeasuredExecutionTime
    },
    store.dispatch
)
