import { Reducer } from 'redux'
import { StatisticActions } from './actions'
import { StatisticsState } from './types'

const initialStatisticsState: StatisticsState = {
    stepsHistory: []
}

export const statisticsReducer: Reducer<StatisticsState, StatisticActions> = (
    state = initialStatisticsState,
    action
) => {
    switch (action.type) {
    case 'AddStepStack': {
        return {
            ...state,
            stepsHistory: state.stepsHistory.concat(action.stepStack)
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
