import { Action, bindActionCreators } from 'redux'
import store from '..'
import { DrawingBoard } from '../../classes/DrawingBoard'

interface ChangeDrawingBoardAction extends Action<'ChangeDrawingBoard'> {
    newDrawingBoard: DrawingBoard
}

interface ChangeBlockSizeInPxAction extends Action<'ChangeBlockSizeInPx'> {
    newSize: number
}

const changeDrawingBoard = (newDrawingBoard: DrawingBoard): ChangeDrawingBoardAction => ({
    type: 'ChangeDrawingBoard',
    newDrawingBoard
})

const changeBlockSizeInPx = (newSize: number): ChangeBlockSizeInPxAction => ({
    type: 'ChangeBlockSizeInPx',
    newSize
})

export type DrawingActions = ChangeDrawingBoardAction
    | ChangeBlockSizeInPxAction

export const drawingActionDispatcher = bindActionCreators(
    {
        changeDrawingBoard,
        changeBlockSizeInPx
    },
    store.dispatch
)
