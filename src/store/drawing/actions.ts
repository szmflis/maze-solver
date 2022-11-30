import { Action, bindActionCreators } from 'redux'
import store from '..'
import { DrawingBoard } from '../../classes/DrawingBoard'

interface ChangeDrawingBoardAction extends Action<'ChangeDrawingBoard'> {
    newDrawingBoard: DrawingBoard
}

const changeDrawingBoard = (newDrawingBoard: DrawingBoard): ChangeDrawingBoardAction => ({
    type: 'ChangeDrawingBoard',
    newDrawingBoard
})

export type DrawingActions = ChangeDrawingBoardAction

export const drawingActionDispatcher = bindActionCreators(
    {
        changeDrawingBoard
    },
    store.dispatch
)
