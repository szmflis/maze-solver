import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Board } from '../classes/Board'
import { CellState } from '../classes/Cell'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { resizeCanvas } from '../utils/CanvasUtils'
import { Coordinate } from '../utils/Coordinate'

interface DrawingServiceProps {
    drawingContext: CanvasRenderingContext2D | null
}

export const useDrawingService = (props: DrawingServiceProps) => {

    const simulationBoard = useSelector<AppState, Board>((state) => state.simulationReducer.board)

    const [drawingContext, setDrawingContext] = useState<CanvasRenderingContext2D | null>()
    const [xStartPoints, setXStartPoints] = useState<Coordinate[]>()
    const [yStartPoints, setYStartPoints] = useState<Coordinate[]>()
    const [blockSide, setBlockSide] = useState<number>(0)

    useEffect(() => {
        setDrawingContext(props.drawingContext)
    }, [props])

    useEffect(() => {
        calculateStartingPoints()
    }, [simulationBoard.getBoardHeight(), simulationBoard.getBoardWidth()])

    const draw = (): void => {
        calculateStartingPoints()
        drawEmptyBoard()
        drawRectangles()
    }

    const calculateStartingPoints = () => {
        if (!drawingContext) return
        if (!shouldRecalculateStartingPoints()) return
        const canvasWidth = drawingContext.canvas.width
        const canvasHeight = drawingContext.canvas.height
        const width = simulationBoard.getBoardWidth() + 1
        const height = simulationBoard.getBoardHeight() + 1

        const blockWidth = Math.floor(canvasWidth / width)
        const blockheight = Math.floor(canvasHeight / height)
        const blockSideLength = Math.min(blockWidth, blockheight)
        setBlockSide(blockSideLength)

        const newXStartPoints: Coordinate[] = []
        for (let x = 0; x <= width * blockSideLength; x = x + blockSideLength) {
            newXStartPoints.push(new Coordinate(x, 0))
        }
        const newYStartPoints: Coordinate[] = []
        for (let y = 0; y <= height * blockSideLength; y = y + blockSideLength) {
            newYStartPoints.push(new Coordinate(0, y))
        }

        newYStartPoints.pop()
        newXStartPoints.pop()

        setXStartPoints(newXStartPoints)
        setYStartPoints(newYStartPoints)
        simulationActionDispatcher.setStartingCoordinates(newYStartPoints, newXStartPoints)
    }

    const drawRectangles = (): void => {
        for (let y = 0; y < simulationBoard.getBoardHeight(); y++) {
            for (let x = 0; x < simulationBoard.getBoardWidth(); x++) {
                const simulationBoardCell = simulationBoard.getBoard()[y][x]
                const cellStartingCoordinate = simulationBoardCell.getStartingCoordinate()
                cellStartingCoordinate &&
                    drawRectangle(cellStartingCoordinate, simulationBoardCell.getState())
            }
        }
    }

    const drawRectangle = (startPoint: Coordinate, cellState: CellState): void => {
        if (!drawingContext) return
        switch (cellState) {
        case CellState.AIR:
            drawingContext.fillStyle = 'rgba(255, 255, 255, 0.5)'
            break
        case CellState.UNVISITED:
            drawingContext.fillStyle = 'rgba(0, 0, 0, 0.71)'
            break
        case CellState.WALL:
            drawingContext.fillStyle = 'rgba(0, 0, 0, 0.71)'
            break
        case CellState.VISITED:
            drawingContext.fillStyle = 'rgba(255, 0, 0, 0.5)'
            break
        case CellState.PLAYER:
            drawingContext.fillStyle = 'rgba(100, 100, 50, 0.5)'
            break
        default:
            console.log('Reached unsuported fill style')
        }

        drawingContext.fillRect(startPoint.x, startPoint.y, blockSide, blockSide)
    }

    const drawEmptyBoard = (): void => {
        if (!drawingContext || !xStartPoints || !yStartPoints) return

        const widthLeft = drawingContext.canvas.width - xStartPoints[xStartPoints.length - 1].x
        const heightLeft = drawingContext.canvas.height - yStartPoints[yStartPoints.length - 1].y

        drawingContext.translate(Math.floor(widthLeft / 2), Math.floor(heightLeft / 2))

        xStartPoints.forEach(xCoord => {
            const toCoord = new Coordinate(
                xCoord.x,
                yStartPoints[yStartPoints.length - 1].y
            )
            drawLine(xCoord, toCoord)
        })

        yStartPoints.forEach(yCoord => {
            const toCoord = new Coordinate(
                xStartPoints[xStartPoints.length - 1].x,
                yCoord.y
            )
            drawLine(yCoord, toCoord)
        })
    }

    const shouldRecalculateStartingPoints = () => {
        if (simulationBoard.getBoardHeight() + 1 !== yStartPoints?.length) {
            return true
        }
        if (simulationBoard.getBoardWidth() + 1 !== xStartPoints?.length) {
            return true
        }
        return false
    }

    const drawLine = (
        from: Coordinate,
        to: Coordinate
    ): void => {
        if (!drawingContext) return
        drawingContext.beginPath()
        drawingContext.lineWidth = 2
        drawingContext.moveTo(from.x, from.y)
        drawingContext.lineTo(to.x, to.y)
        drawingContext.stroke()
    }

    const predraw = (
        canvas: HTMLCanvasElement
    ): void => {
        if (!drawingContext) return
        drawingContext.save()
        resizeCanvas(canvas)
        const { width, height } = canvas
        drawingContext.clearRect(0, 0, width, height)
    }

    const postdraw = (): void => {
        if (!drawingContext) return
        drawingContext.restore()
    }

    return {
        draw,
        predraw,
        postdraw
    }
}
