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
            const animationFrameId = render()
            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }, [drawingService.draw])

        const render = (): number => {
            drawingService.predraw()
            drawingService.draw()
            drawingService.postdraw()
            return window.requestAnimationFrame(render)
        }

        return canvasRef
    }

/*
        16s as commited
*/
