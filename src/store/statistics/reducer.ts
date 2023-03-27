import { Reducer } from 'react'
import { StatisticActions } from './actions'
import { StatisticsState } from './types'

const initialStatisticsState: StatisticsState = {
    stepsHistory: []
}

export const informationReducer: Reducer<StatisticsState, StatisticActions> = (
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
    }
}
