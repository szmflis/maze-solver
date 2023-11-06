import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { resizeCanvas } from '../utils/CanvasUtils'
import { Coordinate } from '../utils/Coordinate'
import { Maze } from '../classes/model/Maze'
import { CellState } from '../classes/model/Cell'
import { COLOR_MAP } from '../drawers/RectangleDrawer'

interface DrawingServiceProps {
    drawingContext: CanvasRenderingContext2D | null
}

export const useDrawingService = (props: DrawingServiceProps) => {

    const { drawingContext } = props

    const simulationBoard = useSelector<AppState, Maze>((state) => state.boardReducer.board)

    const [blockSide, setBlockSide] = useState<number>(0)

    useEffect(() => {
        calculateStartingPoints()
    })

    const draw = (): void => {
        translateBoard()
        drawRectangles()
        drawEmptyBoard()
    }

    const translateBoard = () => {
        if (!drawingContext) return

        const widthLeft = drawingContext.canvas.width - (simulationBoard.getBoardWidthInPx() + blockSide)
        const heightLeft = drawingContext.canvas.height - (simulationBoard.getBoardHeightInPx() + blockSide)

        drawingContext.translate(Math.floor(widthLeft / 2), Math.floor(heightLeft / 2))
    }

    const drawEmptyBoard = (): void => {
        beginPath()
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
        commitStrokes()
    }

    const drawLine = (
        from: Coordinate,
        to: Coordinate
    ): void => {
        if (!drawingContext) return
        drawingContext.lineWidth = 2
        drawingContext.moveTo(from.x, from.y)
        drawingContext.lineTo(to.x, to.y)
    }

    const beginPath = () => {
        if (!drawingContext) return
        drawingContext.beginPath()
    }

    const commitStrokes = () => {
        if (!drawingContext) return
        drawingContext.stroke()
    }

    const predraw = (): void => {
        if (!drawingContext) return
        drawingContext.save()
        const canvas = drawingContext.canvas
        resizeCanvas(canvas)
    }

    const postdraw = (): void => {
        if (!drawingContext) return
        drawingContext.restore()
    }

    const drawRectangles = (): void => {
        if (!drawingContext) return
        Object.values(CellState).filter(obj => typeof obj === 'string').forEach(value => {
            const fillStyle = COLOR_MAP.get(value)
            if (fillStyle) {
                drawingContext.fillStyle = fillStyle
            }
            const startCoords = getStartingCoordinatesOfState(value, simulationBoard)
            startCoords.forEach(startCoord => {
                if (startCoord) {
                    drawingContext.fillRect(startCoord.x, startCoord.y, blockSide, blockSide)
                }
            })
        })
    }

    const getStartingCoordinatesOfState = (state: CellState | string, board: Maze) => {
        const startCoords = []
        for (let y = 0; y < board.getBoardHeight(); y++) {
            for (let x = 0; x < board.getBoardWidth(); x++) {
                const simulationBoardCell = simulationBoard.getBoard()[y][x]
                if (simulationBoardCell.getState() === state) {
                    startCoords.push(simulationBoardCell.getStartingCoordinate())
                }
            }
        }
        return startCoords
    }

    const calculateStartingPoints = () => {
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
        draw,
        predraw,
        postdraw
    }
}
