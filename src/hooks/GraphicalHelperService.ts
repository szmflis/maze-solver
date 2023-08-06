import { useSelector } from 'react-redux'
import { graphicsActionDispatcher } from '../store/graphics/actions'
import { AppState } from '../store'
import { Coordinate } from '../utils/Coordinate'
import { boardActionDispatcher } from '../store/board/actions'

export const useGraphicalHelperService = () => {

    const graphicsState = useSelector((state: AppState) => state.graphicsReducer)

    const drawingContext = useSelector((state: AppState) => state.graphicsReducer.drawingContext)

    const simulationBoard = useSelector((state: AppState) => state.boardReducer.board)

    const setDrawingContext = (ctx: CanvasRenderingContext2D): void => {
        graphicsActionDispatcher.setDrawingContext(ctx)
    }

    const getDrawingContext = (): CanvasRenderingContext2D | null => {
        return graphicsState.drawingContext
    }

    const setBlockSide = (blockSide: number) => graphicsActionDispatcher.setBlockSideInPx(blockSide)

    const calculateBoardStartPoints = () => {
        console.log('recalc')
        if (!drawingContext) return

        const canvasWidth = drawingContext.canvas.width
        const canvasHeight = drawingContext.canvas.height

        const boardWidth = simulationBoard.getBoardWidth() + 1
        const boardHeight = simulationBoard.getBoardHeight() + 1

        const blockWidth = Math.floor(canvasWidth / boardWidth)
        const blockHeight = Math.floor(canvasHeight / boardHeight)
        const blockSideLength = Math.min(blockWidth, blockHeight)

        setBlockSide(blockSideLength)

        const newXStartPoints: Coordinate[] = []
        for (let x = 0; x <= boardWidth * blockSideLength; x = x + blockSideLength) {
            newXStartPoints.push(new Coordinate(x, 0))
        }
        const newYStartPoints: Coordinate[] = []
        for (let y = 0; y <= boardHeight * blockSideLength; y = y + blockSideLength) {
            newYStartPoints.push(new Coordinate(0, y))
        }

        newYStartPoints.pop()
        newXStartPoints.pop()

        boardActionDispatcher.setStartingCoordinates(newYStartPoints, newXStartPoints)
    }

    return {
        setDrawingContext,
        getDrawingContext,
        calculateBoardStartPoints
    }
}
