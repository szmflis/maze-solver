import { Reducer } from 'redux'
import { StatisticActions } from './actions'
import { StatisticsState } from './types'

const initialStatisticsState: StatisticsState = {
    stepsHistory: [],
    algorithmExecutionEndTime: 0,
    alogrithmExecutionStartTime: 0,
    measuredAlgorithmExecutionTime: 0
}

export const statisticsReducer: Reducer<StatisticsState, StatisticActions> = (
    state = initialStatisticsState,
    action
) => {
    switch (action.type) {
    case 'AddStepStack': {
        const newStepsHistory = state.stepsHistory.concat(action.stepStack)
        if (newStepsHistory.length > 10) {
            newStepsHistory.shift()
        }

        return {
            ...state,
            stepsHistory: newStepsHistory
        }
    }
    case 'ClearStepStack': {
        return {
            ...state,
            stepsHistory: []
        }
    }
    case 'SetMeasuredExecutionTime': {
        return {
            ...state,
            measuredAlgorithmExecutionSpeed: action.measuredExecutionTime
        }
    }
    case 'SetExecutionStartTime': {
        return {
            ...state,
            alogrithmExecutionStartTime: action.executionStartTime
        }
    }
    case 'SetExecutionEndTime': {
        return {
            ...state,
            algorithmExecutionEndTime: action.executionEndTime,
            measuredAlgorithmExecutionTime: action.executionEndTime - state.alogrithmExecutionStartTime
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
