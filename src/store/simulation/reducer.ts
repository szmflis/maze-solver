import { Reducer } from 'redux'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    isRunning: false,
    simulationStep: 0,
    mazeGenerationAlgorithm: 'BINARY_TREE',
    simulationSpeed: 1,
    simulationMode: 'MAZE_GEN',
    simulationFinished: false
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
        return {
            ...initialSimulationState,
            mazeGenerationAlgorithm: state.mazeGenerationAlgorithm
        }
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
            isRunning: false,
            simulationFinished: true
        }
    }
    case 'SetMazeGeneratingAlgorithm': {
        return {
            ...state,
            mazeGenerationAlgorithm: action.algorithm
        }
    }
    case 'SetSimulationSpeed': {
        return {
            ...state,
            simulationSpeed: action.newSpeed
        }
    }
    case 'SetSimulationMode': {
        return {
            ...state,
            simulationMode: action.simMode
        }
    }
    case 'SetFinishedSimulation': {
        return {
            ...state,
            simulationFinished: action.isFinished
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
