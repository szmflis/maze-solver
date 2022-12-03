import { Reducer } from 'redux'
import { Board } from '../../classes/Board'
import { CellState } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    boardHeight: 20,
    boardWidth: 20,
    board: new Board(20, 20),
    isRunning: false
}

export const simulationReducer: Reducer<SimulationState, SimulationActions> = (
    state = initialSimulationState,
    action
) => {
    // console.log(state.board)
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
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setBoardHeight(action.newHeight)
        return {
            ...state,
            boardHeight: action.newHeight,
            board: newBoard
        }
    }
    case 'CheckBoardCellState':
    {
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setCellState(action.coordinate, CellState.WALL)
        return {
            ...state,
            board: newBoard
        }
    }
    case 'UncheckBoardCellState':
    {
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setCellState(action.coordinate, CellState.AIR)
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
        for (let y = 0; y < colLen; y++) {
            for (let x = 0; x < rowLen; x++) {
                const startPoint = new Coordinate(action.columnPoints[y].x, action.rowPoints[x].y)
                oldBoard.setStartingCoordinate(y, x, startPoint)
            }
        }
        return {
            ...state,
            board: oldBoard
        }
    }
    case 'UnvisitEntireBoard':
    {
        const oldBoard = state.board
        for (let y = 0; y < oldBoard.getBoardHeight(); y++) {
            for (let x = 0; x < oldBoard.getBoardWidth(); x++) {
                const startPoint = new Coordinate(x, y)
                oldBoard.setCellState(startPoint, CellState.UNVISITED)
            }
        }
        return {
            ...state,
            board: oldBoard
        }
    }
    case 'SetBoard': {
        return {
            ...state,
            board: action.board
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
