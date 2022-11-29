import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { SimulationState } from '../store/simulation/types'
import { resizeCanvas } from '../utils/CanvasUtils'
import { Coordinate } from '../utils/Coordinate'

export const useDrawingService = () => {
    const simulationState = useSelector<AppState, SimulationState>(
        (state) => state.simulationReducer)

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

    const draw = (
        ctx: CanvasRenderingContext2D,
        frameCount: number
    ): void => {
        drawBoard(ctx, simulationState.boardWidth, simulationState.boardHeight)
    }

    const drawBoard = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
        const canvasWidth = ctx.canvas.width
        const canvasHeight = ctx.canvas.height
        width = width + 1
        height = height + 1

        const blockWidth = Math.floor(canvasWidth / width)
        const blockheight = Math.floor(canvasHeight / height)
        const blockSideLength = Math.min(blockWidth, blockheight)
        console.log(canvasWidth, canvasHeight)

        // array of points from which to start vertical
        // array of points form which to start horizontal
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

        // console.log(widthLeft, heightLeft)

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

    }

    // const drawBoard = (ctx: CanvasRenderingContext2D, width: number): void => {
    //     const canvasWidth = ctx.canvas.width
    //     const canvasHeight = ctx.canvas.height

    //     const blockSideLength = Math.floor(canvasWidth / width)
    //     // array of points from which to start vertical
    //     // array of points form which to start horizontal
    //     const xStartPoints: Coordinate[] = []
    //     for (let x = 0; x < canvasWidth; x = x + blockSideLength) {
    //         xStartPoints.push(new Coordinate(x, 0))
    //     }
    //     const yStartPoints: Coordinate[] = []
    //     for (let y = 0; y < canvasHeight; y = y + blockSideLength) {
    //         yStartPoints.push(new Coordinate(0, y))
    //     }

    //     yStartPoints.pop()
    //     xStartPoints.pop()

    //     const widthLeft = canvasWidth - xStartPoints[xStartPoints.length - 1].x
    //     const heightLeft = canvasHeight - yStartPoints[yStartPoints.length - 1].y

    //     console.log(widthLeft, heightLeft)

    //     ctx.translate(Math.floor(widthLeft / 2), Math.floor(heightLeft / 2))

    //     xStartPoints.forEach(xCoord => {
    //         const toCoord = new Coordinate(
    //             xCoord.x,
    //             yStartPoints[yStartPoints.length - 1].y
    //         )
    //         drawLine(xCoord, toCoord, ctx)
    //     })

    //     yStartPoints.forEach(yCoord => {
    //         const toCoord = new Coordinate(
    //             xStartPoints[xStartPoints.length - 1].x,
    //             yCoord.y
    //         )
    //         drawLine(yCoord, toCoord, ctx)
    //     })

    // }

    const drawLine = (
        from: Coordinate,
        to: Coordinate,
        ctx: CanvasRenderingContext2D
    ): void => {
        // console.log(from, to)
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
    }

    const drawArc = (
        start: number,
        end: number,
        ctx: CanvasRenderingContext2D,
        frameCount: number
    ): void => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(
            start,
            end,
            20 * Math.sin(frameCount * 0.05) ** 2,
            0,
            2 * Math.PI
        )
        ctx.fill()
    }

    return {
        draw,
        predraw,
        postdraw
    }
}
