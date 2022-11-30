import { Action, bindActionCreators } from 'redux'
import store from '..'
import { Coordinate } from '../../utils/Coordinate'

interface ChangeBoardWidthAction extends Action<'ChangeBoardWidth'> {
    newWidth: number
}

interface ChangeBoardHeightAction extends Action<'ChangeBoardHeight'> {
    newHeight: number
}

interface CheckBoardCellStateAction extends Action<'CheckBoardCellState'> {
    coordinate: Coordinate
}

interface UncheckBoardCellStateAction extends Action<'UncheckBoardCellState'> {
    coordinate: Coordinate
}

const changeBoardWidth = (newWidth: number): ChangeBoardWidthAction => ({
    type: 'ChangeBoardWidth',
    newWidth
})

const changeBoardHeight = (newHeight: number): ChangeBoardHeightAction => ({
    type: 'ChangeBoardHeight',
    newHeight
})

const checkBoardCellState = (coordinate: Coordinate): CheckBoardCellStateAction => ({
    type: 'CheckBoardCellState',
    coordinate
})

const uncheckBoardCellState = (coordinate: Coordinate): UncheckBoardCellStateAction => ({
    type: 'UncheckBoardCellState',
    coordinate
})

export type SimulationActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction
    | CheckBoardCellStateAction
    | UncheckBoardCellStateAction

export const simulationActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight,
        checkBoardCellState,
        uncheckBoardCellState
    },
    store.dispatch
)
