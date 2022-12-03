import { Reducer } from 'redux'
import { Board } from '../../classes/Board'
import { CellState } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    boardHeight: 4,
    boardWidth: 4,
    board: new Board(4, 4),
    isRunning: false
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
        console.log('Increment!', action, state.boardWidth)
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
    case 'SetBoardStartPoints':
    {
        const oldBoard = state.board

        const rowLen = action.rowPoints.length
        const colLen = action.columnPoints.length
        console.log('Column length: ', colLen, 'Row Length:', rowLen)
        for (let y = 0; y < colLen; y++) {
            for (let x = 0; x < rowLen; x++) {
                console.log(action)
                const startPoint = new Coordinate(action.columnPoints[y].x, action.rowPoints[x].y)
                console.log(startPoint)
                oldBoard.setStartingCoordinate(y, x, startPoint)
            }
        }

        return {
            ...state,
            board: oldBoard
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
