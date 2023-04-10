import { Reducer } from 'redux'
import { Board } from '../../classes/Board'
import { CellState } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'
import { BoardActions } from './actions'
import { BoardState } from './types'

const boardState: BoardState = {
    boardHeight: 10,
    boardWidth: 10,
    board: new Board(10, 10)
}

export const boardReducer: Reducer<BoardState, BoardActions> = (
    state = boardState,
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
        newBoard.setCellState(action.coordinate, CellState.VISITED)
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
    case 'SetBoardCellState':
    {
        const newBoard = new Board(state.boardWidth, state.boardHeight, state.board.getBoard())
        newBoard.setCellState(action.coordinate, action.newState)
        return {
            ...state,
            board: newBoard
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
