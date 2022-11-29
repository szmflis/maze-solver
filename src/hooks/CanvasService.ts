import { MutableRefObject, useEffect, useRef } from 'react'
import { useDrawingService } from './DrawingService'

export const useCanvasService =
    (): MutableRefObject<HTMLCanvasElement> => {

        const canvasRef = useRef<HTMLCanvasElement>(null) as React.MutableRefObject<HTMLCanvasElement>
        const drawingService = useDrawingService()

        useEffect(() => {
            const canvas = canvasRef.current
            if (canvas == null) return
            const context = canvas.getContext('2d')
            if (context == null) return
            let frameCount = 0
            let animationFrameId: number

            const render = (): void => {
                frameCount++
                drawingService.predraw(context, canvas)
                drawingService.draw(context, frameCount)
                drawingService.postdraw(context)
                animationFrameId = window.requestAnimationFrame(render)
            }

            render()
            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }, [drawingService.draw])

        return canvasRef
    }
