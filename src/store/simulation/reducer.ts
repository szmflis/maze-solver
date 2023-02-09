import { Reducer } from 'redux'
import { Board } from '../../classes/Board'
import { CellState } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'
import { getRandomNumberInRange } from '../../utils/GeneratorUtils'
import { SimulationActions } from './actions'
import { SimulationState } from './types'

const initialSimulationState: SimulationState = {
    boardHeight: 10,
    boardWidth: 10,
    board: new Board(10, 10),
    isRunning: false,
    simulationStep: 0,
    mazeGenerationAlgorithm: 'BINARY_SEARCH'
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
    case 'ResetSimulation': {
        const boardHeight = state.boardHeight
        const boardWidth = state.boardWidth
        const board = new Board(boardWidth, boardHeight)
        return {
            ...initialSimulationState,
            board,
            boardHeight,
            boardWidth
        }
    }
    case 'IncrementSimulationStep': {
        return {
            ...state,
            simulationStep: state.simulationStep + 1
        }
    }
    case 'FinishSimulation': {
        const newBoard = state.board
        newBoard.setCellState(
            new Coordinate(getRandomNumberInRange(0, state.boardWidth), getRandomNumberInRange(0, state.boardHeight)),
            CellState.ENTRY
        )
        newBoard.setCellState(
            new Coordinate(getRandomNumberInRange(0, state.boardWidth), getRandomNumberInRange(0, state.boardHeight)),
            CellState.EXIT
        )
        const playerCoordinates = newBoard.getCoordinatesOfCellState(CellState.PLAYER)
        if (playerCoordinates) {
            newBoard.setCellState(
                playerCoordinates,
                CellState.AIR
            )
        }
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
