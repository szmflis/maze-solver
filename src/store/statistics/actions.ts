import { Action, bindActionCreators } from 'redux'
import store from '..'
import { StepStack } from '../../classes/model/StepStack'

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

interface SetExecutionStartTimeAction extends Action<'SetExecutionStartTime'> {
    executionStartTime: number
}

const setExecutionStartTime = (executionStartTime: number): SetExecutionStartTimeAction => ({
    type: 'SetExecutionStartTime',
    executionStartTime
})

interface SetExecutionEndTimeAction extends Action<'SetExecutionEndTime'> {
    executionEndTime: number
}

const setExecutionEndTime = (executionEndTime: number): SetExecutionEndTimeAction => ({
    type: 'SetExecutionEndTime',
    executionEndTime
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
    | SetExecutionStartTimeAction
    | SetExecutionEndTimeAction

export const statisticsActionDispatcher = bindActionCreators(
    {
        addStepStack,
        clearStepStack,
        setMeasuredExecutionTime,
        setExecutionStartTime,
        setExecutionEndTime
    },
    store.dispatch
)
