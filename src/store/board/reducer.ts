import { Reducer } from 'redux'
import { Coordinate } from '../../utils/Coordinate'
import { BoardActions } from './actions'
import { BoardState } from './types'
import { Maze } from '../../classes/model/Maze'
import { CellState } from '../../classes/model/Cell'

const boardState: BoardState = {
    boardHeight: 5,
    boardWidth: 5,
    board: new Maze(5, 5)
}

export const boardReducer: Reducer<BoardState, BoardActions> = (
    state = boardState,
    action
) => {
    switch (action.type) {
    case 'ResetBoard':
    {
        return {
            ...state,
            board: new Maze(state.boardHeight, state.boardWidth)
        }
    }
    case 'ChangeBoardWidth':
    {
        const newBoard = new Maze(action.newWidth, state.boardHeight)
        return {
            ...state,
            boardWidth: action.newWidth,
            board: newBoard
        }
    }
    case 'ChangeBoardHeight':
    {
        const newBoard = new Maze(state.boardWidth, action.newHeight)
        return {
            ...state,
            boardHeight: action.newHeight,
            board: newBoard
        }
    }
    case 'SetBoardStartingCoordinates':
    {
        const newBoard = state.board
        for (let y = 0; y < action.columnPoints.length; y++) {
            for (let x = 0; x < action.rowPoints.length; x++) {
                const startPoint = new Coordinate(action.columnPoints[y].x, action.rowPoints[x].y)
                newBoard.setStartingCoordinate(y, x, startPoint)
            }
        }
        return {
            ...state,
            board: newBoard
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
    case 'SetBoardCellState': {
        const newBoard = state.board
        newBoard.setCellState(action.coordinate, action.cellState)
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
