import { Action, bindActionCreators } from 'redux'
import { Coordinate } from '../../utils/Coordinate'
import store from '..'

interface SetDrawStartPointsAction extends Action<'SetDrawStartPoints'> {
    startPoints: Coordinate[][]
}

const setDrawStartPoints = (startPoints: Coordinate[][]): SetDrawStartPointsAction => ({
    type: 'SetDrawStartPoints',
    startPoints
})

interface SetDrawingContextAction extends Action<'SetDrawingContext'> {
    drawingContext: CanvasRenderingContext2D
}

const setDrawingContext = (drawingContext: CanvasRenderingContext2D): SetDrawingContextAction => ({
    type: 'SetDrawingContext',
    drawingContext
})

export type GraphicsActions = SetDrawStartPointsAction
    | SetDrawingContextAction

export const graphicsActionDispatcher = bindActionCreators(
    {
        setDrawStartPoints,
        setDrawingContext
    },
    store.dispatch
)
