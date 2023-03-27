import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Board } from '../classes/Board'
import { CellState } from '../classes/Cell'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { resizeCanvas } from '../utils/CanvasUtils'
import { Coordinate } from '../utils/Coordinate'
import boardColors from '../styles/boardColors'

interface DrawingServiceProps {
    drawingContext: CanvasRenderingContext2D | null
}

export const useDrawingService = (props: DrawingServiceProps) => {

    const simulationBoard = useSelector<AppState, Board>((state) => state.boardReducer.board)

    const [drawingContext, setDrawingContext] = useState<CanvasRenderingContext2D | null>()
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
            drawingContext.fillStyle = boardColors.grey
            break
        case CellState.UNVISITED:
            drawingContext.fillStyle = boardColors.darkGreen
            break
        case CellState.VISITED:
            drawingContext.fillStyle = boardColors.green
            break
        case CellState.PLAYER:
            drawingContext.fillStyle = boardColors.red
            break
        case CellState.ENTRY:
            drawingContext.fillStyle = 'rgba(50, 0, 255, 0.5)'
            break
        case CellState.EXIT:
            drawingContext.fillStyle = 'rgba(255, 0, 0, 0.5)'
            break
        default:
            console.log('Reached unsuported fill style')
        }

        drawingContext.fillRect(startPoint.x, startPoint.y, blockSide, blockSide)
    }

    const drawEmptyBoard = (): void => {

        if (!drawingContext) return

        const widthLeft = drawingContext.canvas.width - (simulationBoard.getBoardWidthInPx() + blockSide)
        const heightLeft = drawingContext.canvas.height - (simulationBoard.getBoardHeightInPx() + blockSide)

        drawingContext.translate(Math.floor(widthLeft / 2), Math.floor(heightLeft / 2))

        simulationBoard.getBoard().forEach(row => {
            row.forEach(cell => {
                const walls = cell.getWalls()
                const startingCoordinate = cell.getStartingCoordinate()
                if (!startingCoordinate) return
                if (walls[0]) {
                    const fromCoor = startingCoordinate
                    const toCoord = new Coordinate(startingCoordinate.x + blockSide, startingCoordinate.y)
                    drawLine(fromCoor, toCoord)
                }
                if (walls[1]) {
                    const fromCoor = new Coordinate(startingCoordinate.x + blockSide, startingCoordinate.y)
                    const toCoord = new Coordinate(startingCoordinate.x + blockSide, startingCoordinate.y + blockSide)
                    drawLine(fromCoor, toCoord)
                }
                if (walls[2]) {
                    const fromCoor = new Coordinate(startingCoordinate.x, startingCoordinate.y + blockSide)
                    const toCoord = new Coordinate(startingCoordinate.x + blockSide, startingCoordinate.y + blockSide)
                    drawLine(fromCoor, toCoord)
                }
                if (walls[3]) {
                    const fromCoor = startingCoordinate
                    const toCoord = new Coordinate(startingCoordinate.x, startingCoordinate.y + blockSide)
                    drawLine(fromCoor, toCoord)
                }
            })
        })
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

        boardActionDispatcher.setStartingCoordinates(newYStartPoints, newXStartPoints)
    }

    const shouldRecalculateStartingPoints = () => {
        if (simulationBoard.getBoardHeight() + 1 !== simulationBoard.getBoard().length) {
            return true
        }
        if (simulationBoard.getBoardWidth() + 1 !== simulationBoard.getBoard()[0].length) {
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
