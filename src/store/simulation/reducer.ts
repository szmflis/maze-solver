import { Reducer } from 'redux'
import { Board } from '../../classes/Board'
import { CellState } from '../../classes/Cell'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    boardHeight: 4,
    boardWidth: 4,
    board: new Board(4, 4)
}

export const simulationReducer: Reducer<SimulationState, SimulationActions> = (
    state = initialSimulationState,
    action
) => {
    switch (action.type) {
    case 'ChangeBoardWidth':
    {
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setBoardWidth(action.newWidth)
        return {
            ...state,
            boardWidth: action.newWidth,
            board: newBoard
        }
    }
    case 'ChangeBoardHeight':
    {
        return {
            ...state,
            boardHeight: action.newHeight
        }
    }
    case 'CheckBoardCellState':
    {
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setCellState(action.coordinate, CellState.CHECKED)
        return {
            ...state,
            board: newBoard
        }
    }
    case 'UncheckBoardCellState':
    {
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setCellState(action.coordinate, CellState.UNCHECKED)
        return {
            ...state,
            board: newBoard
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
