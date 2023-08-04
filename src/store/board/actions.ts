import { Action, bindActionCreators } from 'redux'
import store from '..'
import { Coordinate } from '../../utils/Coordinate'
import { Maze } from '../../classes/model/Maze'
import { CellState } from '../../classes/model/Cell'

interface ResetBoardAction extends Action<'ResetBoard'> {}

const resetBoard = (): ResetBoardAction => ({
    type: 'ResetBoard'
})

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

interface SetBoardStartingCoordinatesAction extends Action<'SetBoardStartingCoordinates'> {
    rowPoints: Coordinate[]
    columnPoints: Coordinate[]
}

const setStartingCoordinates = (
    rowPoints: Coordinate[], columnPoints: Coordinate[]
): SetBoardStartingCoordinatesAction => ({
    type: 'SetBoardStartingCoordinates',
    rowPoints,
    columnPoints
})

interface UnvisitEntireBoardAction extends Action<'UnvisitEntireBoard'> {}

const unvisitEntireBoard = (): UnvisitEntireBoardAction => ({
    type: 'UnvisitEntireBoard'
})

interface SetBoardAction extends Action<'SetBoard'> {
    board: Maze
}

const setBoard = (board: Maze): SetBoardAction => ({
    type: 'SetBoard',
    board
})

interface SetBoardCellStateAction extends Action<'SetBoardCellState'> {
    coordinate: Coordinate
    cellState: CellState
}

const setBoardCellState = (
    coordinate: Coordinate,
    cellState: CellState
): SetBoardCellStateAction => ({
    type: 'SetBoardCellState',
    coordinate,
    cellState
})

export type BoardActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction
    | SetBoardStartingCoordinatesAction
    | UnvisitEntireBoardAction
    | SetBoardAction
    | SetBoardCellStateAction
    | ResetBoardAction

export const boardActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight,
        setStartingCoordinates,
        unvisitEntireBoard,
        setBoard,
        setBoardCellState,
        resetBoard
    },
    store.dispatch
)
