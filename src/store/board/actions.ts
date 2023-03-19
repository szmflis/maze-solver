import { Action, bindActionCreators } from 'redux'
import store from '..'
import { Board } from '../../classes/Board'
import { Cell, CellState } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'

interface ChangeBoardWidthAction extends Action<'ChangeBoardWidth'> {
    newWidth: number
}

const changeBoardWidth = (newWidth: number): ChangeBoardWidthAction => ({
    type: 'ChangeBoardWidth',
    newWidth
})

interface ChangeBoardHeightAction extends Action<'ChangeBoardHeight'> {
    newHeight: number
}

const changeBoardHeight = (newHeight: number): ChangeBoardHeightAction => ({
    type: 'ChangeBoardHeight',
    newHeight
})

interface CheckBoardCellStateAction extends Action<'CheckBoardCellState'> {
    coordinate: Coordinate
}

const checkBoardCellState = (coordinate: Coordinate): CheckBoardCellStateAction => ({
    type: 'CheckBoardCellState',
    coordinate
})

interface SetBoardCellStateAction extends Action<'SetBoardCellState'> {
    coordinate: Coordinate
    newState: CellState
}

const setBoardCellState = (coordinate: Coordinate, newState: CellState): SetBoardCellStateAction => ({
    type: 'SetBoardCellState',
    coordinate,
    newState
})

interface UncheckBoardCellStateAction extends Action<'UncheckBoardCellState'> {
    coordinate: Coordinate
}

const uncheckBoardCellState = (coordinate: Coordinate): UncheckBoardCellStateAction => ({
    type: 'UncheckBoardCellState',
    coordinate
})

interface SetBoardStartPointsAction extends Action<'SetBoardStartPoints'> {
    rowPoints: Coordinate[]
    columnPoints: Coordinate[]
}

const setStartingCoordinates = (
    rowPoints: Coordinate[], columnPoints: Coordinate[]
): SetBoardStartPointsAction => ({
    type: 'SetBoardStartPoints',
    rowPoints,
    columnPoints
})

interface UnvisitEntireBoardAction extends Action<'UnvisitEntireBoard'> {}

const checkEntireBoard = (): UnvisitEntireBoardAction => ({
    type: 'UnvisitEntireBoard'
})

interface SetBoardAction extends Action<'SetBoard'> {
    board: Board
}

const setBoard = (board: Board): SetBoardAction => ({
    type: 'SetBoard',
    board
})

interface SetMazeGenerationAction extends Action<'SetMazeGeneration'> {
    type: 'SetMazeGeneration'
}

const setMazeGeneration = (): SetMazeGenerationAction => ({
    type: 'SetMazeGeneration'
})

export type BoardActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction
    | CheckBoardCellStateAction
    | UncheckBoardCellStateAction
    | SetBoardStartPointsAction
    | UnvisitEntireBoardAction
    | SetBoardAction
    | SetBoardCellStateAction
    | SetMazeGenerationAction

export const boardActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight,
        checkBoardCellState,
        uncheckBoardCellState,
        setStartingCoordinates,
        checkEntireBoard,
        setBoard,
        setBoardCellState,
        setMazeGeneration
    },
    store.dispatch
)
