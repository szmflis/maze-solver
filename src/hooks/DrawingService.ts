import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CellState } from '../classes/Cell'
import { AppState } from '../store'
import { SimulationState } from '../store/simulation/types'
import { resizeCanvas } from '../utils/CanvasUtils'
import { Coordinate } from '../utils/Coordinate'

export const useDrawingService = () => {
    const simulationState = useSelector<AppState, SimulationState>(
        (state) => state.simulationReducer)

    const [boardCellsStartPoints, setBoardCellsStartPoints] = useState<Coordinate[][]>([])
    const [blockSide, setBlockSide] = useState<number>(0)

    const draw = (
        ctx: CanvasRenderingContext2D,
        frameCount: number
    ): void => {
        drawEmptyBoard(ctx, simulationState.boardWidth, simulationState.boardHeight)
        drawRectangles(ctx)
    }

    const drawRectangles = (ctx: CanvasRenderingContext2D): void => {
        for (let y = 0; y < boardCellsStartPoints.length; y++) {
            for (let x = 0; x < boardCellsStartPoints[0].length; x++) {
                const simulationBoardState = simulationState.board.getBoard()[y][x]
                if (simulationBoardState.getState() === CellState.CHECKED) {
                    drawRectangle(ctx, boardCellsStartPoints[y][x])
                }
            }
        }
    }

    const drawRectangle = (ctx: CanvasRenderingContext2D, startPoint: Coordinate): void => {
        ctx.fillRect(startPoint.x, startPoint.y, blockSide, blockSide)
    }

    const drawEmptyBoard = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
        const canvasWidth = ctx.canvas.width
        const canvasHeight = ctx.canvas.height
        width = width + 1
        height = height + 1

        const blockWidth = Math.floor(canvasWidth / width)
        const blockheight = Math.floor(canvasHeight / height)
        const blockSideLength = Math.min(blockWidth, blockheight)

        if (blockSide !== blockSideLength) {
            setBlockSide(blockSideLength)
        }

        const xStartPoints: Coordinate[] = []
        for (let x = 0; x <= width * blockSideLength; x = x + blockSideLength) {
            xStartPoints.push(new Coordinate(x, 0))
        }
        const yStartPoints: Coordinate[] = []
        for (let y = 0; y <= height * blockSideLength; y = y + blockSideLength) {
            yStartPoints.push(new Coordinate(0, y))
        }

        yStartPoints.pop()
        xStartPoints.pop()

        const widthLeft = canvasWidth - xStartPoints[xStartPoints.length - 1].x
        const heightLeft = canvasHeight - yStartPoints[yStartPoints.length - 1].y

        ctx.translate(Math.floor(widthLeft / 2), Math.floor(heightLeft / 2))

        xStartPoints.forEach(xCoord => {
            const toCoord = new Coordinate(
                xCoord.x,
                yStartPoints[yStartPoints.length - 1].y
            )
            drawLine(xCoord, toCoord, ctx)
        })

        yStartPoints.forEach(yCoord => {
            const toCoord = new Coordinate(
                xStartPoints[xStartPoints.length - 1].x,
                yCoord.y
            )
            drawLine(yCoord, toCoord, ctx)
        })

        calculateBoardCellStartPoints(xStartPoints, yStartPoints)
    }

    const calculateBoardCellStartPoints = (
        rowPoints: Coordinate[], columnPoints: Coordinate[]
    ): void => {
        const boardCellStartPoints: Coordinate[][] = []

        const rowLen = rowPoints.length
        const colLen = columnPoints.length
        for (let x = 0; x < rowLen; x++) {
            const row: Coordinate[] = []
            for (let y = 0; y < colLen; y++) {
                const startPoint = new Coordinate(rowPoints[y].x, columnPoints[x].y)
                row.push(startPoint)
            }
            row.pop()
            boardCellStartPoints.push(row)
        }
        boardCellStartPoints.pop()

        // console.log(boardCellStartPoints)

        if (boardCellsStartPoints.length !== boardCellStartPoints.length) {
            console.log('Doing it')
            setBoardCellsStartPoints(boardCellStartPoints)
        }
        // const boardCellStartPoints: Coordinate[] = []

        // const rowLen = rowPoints.length
        // const colLen = columnPoints.length
        // for (let y = 0; y < rowLen; y++) {
        //     for (let x = 0; x < colLen; x++) {
        //         const startPoint = new Coordinate(rowPoints[y].x, columnPoints[x].y)
        //         boardCellStartPoints.push(startPoint)
        //     }
        //     boardCellStartPoints.pop()
        // }

        // for (let y = 0; y < rowLen - 1; y++) {
        //     boardCellStartPoints.pop()
        // }

        // if (boardCellsStartPoints.length !== boardCellStartPoints.length) {
        //     console.log('Doing it')
        //     setBoardCellsStartPoints(boardCellStartPoints)
        // }
    }

    const drawLine = (
        from: Coordinate,
        to: Coordinate,
        ctx: CanvasRenderingContext2D
    ): void => {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
    }

    const predraw = (
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ): void => {
        context.save()
        resizeCanvas(canvas)
        const { width, height } = canvas
        context.clearRect(0, 0, width, height)
    }

    const postdraw = (ctx: CanvasRenderingContext2D): void => {
        ctx.restore()
    }

    return {
        draw,
        predraw,
        postdraw
    }
}
