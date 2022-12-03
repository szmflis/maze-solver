import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useDrawingService } from './DrawingService'

export const useCanvasService =
    (): MutableRefObject<HTMLCanvasElement> => {

        const canvasRef = useRef<HTMLCanvasElement>(null) as
            React.MutableRefObject<HTMLCanvasElement>

        const [drawingContext, setDrawingContext] =
            useState<CanvasRenderingContext2D | null>(null)

        const drawingService = useDrawingService({ drawingContext })

        useEffect(() => {
            const canvas = canvasRef.current
            if (canvas == null) return
            const context = canvas.getContext('2d')
            if (context == null) return
            setDrawingContext(context)
            let animationFrameId: number

            const render = (): void => {
                drawingService.predraw(canvas)
                drawingService.draw()
                drawingService.postdraw()
                animationFrameId = window.requestAnimationFrame(render)
            }

            render()
            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }, [drawingService.draw])

        return canvasRef
    }
