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

export type StatisticActions = AddStepStackAction

export const statisticsActionDispatcher = bindActionCreators(
    {
        addStepStack
    },
    store.dispatch
)
