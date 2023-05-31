import React from 'react'
import { useCanvasService } from '../hooks/CanvasService'
import { Canvas } from './Canvas/Canvas'

export const SimulationCanvas: React.FC = () => {
    const canvasRef = useCanvasService()

    return (
        <Canvas innerref={canvasRef} />
    )
}
