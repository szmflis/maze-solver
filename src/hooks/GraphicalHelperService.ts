import { useSelector } from 'react-redux'
import { graphicsActionDispatcher } from '../store/graphics/actions'
import { AppState } from '../store'

export const useGraphicalHelperService = () => {

    // const graphicsState = useSelector((state: AppState) => state.graphicsReducer)

    // const setDrawingContext = (drawingContext: CanvasRenderingContext2D): void => {
    //     graphicsActionDispatcher.setDrawingContext(drawingContext)
    // }

    // const getDrawingContext = (): CanvasRenderingContext2D | null => {
    //     return graphicsState.drawingContext
    // }

    return {
        // setDrawingContext,
        // getDrawingContext
    }
}
