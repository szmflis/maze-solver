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

export type StatisticActions = AddStepStackAction
    | ClearStepStackAction

export const statisticsActionDispatcher = bindActionCreators(
    {
        addStepStack,
        clearStepStack
    },
    store.dispatch
)
