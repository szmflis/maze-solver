import { Reducer } from 'redux'
import { DrawingBoard } from '../../classes/DrawingBoard'
import { DrawingActions } from './actions'
import { DrawingState } from './types'

const initialDrawingState: DrawingState = {
    drawingBoard: new DrawingBoard([])
}

export const drawingReducer: Reducer<DrawingState, DrawingActions> = (
    state = initialDrawingState,
    action
) => {
    switch (action.type) {
    case 'ChangeDrawingBoard':
    {
        return {
            ...state,
            drawingBoard: action.newDrawingBoard
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
