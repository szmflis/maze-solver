import { MutableRefObject, useEffect, useRef } from 'react'
import { useDrawingService } from './DrawingService'
import { useGraphicalHelperService } from './GraphicalHelperService'

export const useCanvasService =
    (): MutableRefObject<HTMLCanvasElement> => {

        const canvasRef = useRef<HTMLCanvasElement>(null) as
            React.MutableRefObject<HTMLCanvasElement>

        const graphicalHelperService = useGraphicalHelperService()

        const drawingService = useDrawingService()

        useEffect(() => {
            const canvas = canvasRef.current
            if (canvas == null) return
            const context = canvas.getContext('2d')
            if (context == null) return
            graphicalHelperService.setDrawingContext(context)
        }, [])

        useEffect(() => {
            if (graphicalHelperService.getDrawingContext()) {
                requestAnimationFrame(render)
            }
        })

        const render = (): void => {
            drawingService.predraw()
            drawingService.draw()
            drawingService.postdraw()
            requestAnimationFrame(render)
        }

        return canvasRef
    }
