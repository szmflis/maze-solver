import { Reducer } from 'redux'
import { GraphicsState } from './types'
import { GraphicsActions } from './actions'

const graphicsInitState: GraphicsState = {
    drawStartPoints: [],
    drawingContext: null
}

export const graphicsReducer: Reducer<GraphicsState, GraphicsActions> = (
    state = graphicsInitState,
    action
) => {
    switch (action.type) {
    case 'SetDrawStartPoints':
    {
        return {
            ...state,
            drawStartPoints: action.startPoints
        }
    }
    case 'SetDrawingContext':
    {
        console.log('Setting drawing context!!')
        return {
            ...state,
            drawingContext: action.drawingContext
        }
    }
    default:
        neverReached(action)
    }
    return state
}

const neverReached = (never: any): void => {
}
