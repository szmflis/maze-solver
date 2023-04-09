import { Reducer } from 'redux'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    isRunning: false,
    simulationStep: 0,
    mazeGenerationAlgorithm: 'BINARY_TREE'
}

export const simulationReducer: Reducer<SimulationState, SimulationActions> = (
    state = initialSimulationState,
    action
) => {
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
    case 'SetMazeGeneratingAlgorithm': {
        return {
            ...state,
            mazeGenerationAlgorithm: action.algorithm
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
