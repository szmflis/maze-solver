import { Reducer } from 'redux'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    boardHeight: 10,
    boardWidth: 5
}

export const simulationReducer: Reducer<SimulationState, SimulationActions> = (
    state = initialSimulationState,
    action
) => {
    switch (action.type) {
    case 'ChangeBoardWidth':
        return {
            ...state,
            boardWidth: action.newWidth
        }
    case 'ChangeBoardHeight':
        return {
            ...state,
            boardHeight: action.newHeight
        }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
    console.log('Reach unsupported action type in simulation reducer', never)
}
