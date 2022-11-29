import React from 'react'
import styled from 'styled-components'
import { useCanvasService } from '../hooks/CanvasService'
import { theme } from '../styles/theme'
import { Canvas } from './Canvas/Canvas'
import { FlexBox } from './FlexBox/FlexBox'

const CanvasContainer = styled(FlexBox)`
    width: 100%;
    border-radius: 2%/4%;
    overflow: hidden;
    box-shadow: ${theme.shadows.mdShadow_1};
    background-color: ${theme.colors.backgroundLightest};
`

export const SimulationCanvas: React.FC = () => {
    const canvasRef = useCanvasService()

    return (
        <CanvasContainer>
            <Canvas innerref={canvasRef} />
        </CanvasContainer>
    )
}
