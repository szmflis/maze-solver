import { Reducer } from 'redux'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    isRunning: false,
    simulationStep: 0,
    mazeGenerationAlgorithm: 'BINARY_SEARCH'
}

export const simulationReducer: Reducer<SimulationState, SimulationActions> = (
    state = initialSimulationState,
    action
) => {
    console.log('Im here!', action.type)
    switch (action.type) {
    case 'StartSimulation':
    {
        return {
            ...state,
            isRunning: true
        }
    }
    case 'StopSimulation':
    {
        return {
            ...state,
            isRunning: false
        }
    }
    case 'ResetSimulation': {
        return { ...initialSimulationState }
    }
    case 'IncrementSimulationStep': {
        return {
            ...state,
            simulationStep: state.simulationStep + 1
        }
    }
    case 'FinishSimulation': {
        return {
            ...state,
            isRunning: false
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
