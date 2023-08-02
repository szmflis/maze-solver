import { Action, bindActionCreators } from 'redux'
import store from '..'
import { Maze } from '../../classes/Board'
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

export type BoardActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction
    | SetBoardStartingCoordinatesAction
    | UnvisitEntireBoardAction
    | SetBoardAction

export const boardActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight,
        setStartingCoordinates,
        unvisitEntireBoard,
        setBoard
    },
    store.dispatch
)
