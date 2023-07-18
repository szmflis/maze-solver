import React from 'react'
import { boardActionDispatcher } from '../../store/board/actions'
import { theme } from '../../styles/theme'
import { StyledSlider } from '../Slider/Slider'
import { useSimulationService } from '../../hooks/SimulationService'
import { useBoardService } from '../../hooks/BoardService'
import { simulationActionDispatcher } from '../../store/simulation/actions'

export const Sliders: React.FC = () => {
    const simulationService = useSimulationService()
    const boardService = useBoardService()

    const handleWidthSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        boardActionDispatcher.changeBoardWidth(Number(event.target.value))
    }

    const handleHeightSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        boardActionDispatcher.changeBoardHeight(Number(event.target.value))
    }

    const handleSpeedSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        simulationActionDispatcher.setSimulationSpeed(Number(event.target.value))
    }

    return (
        <>
            <StyledSlider
                value={boardService.getBoardWidth()}
                min={10}
                max={100}
                onChange={handleWidthSlide}
                disabled={simulationService.shouldDisableSimulationControls()}
                label={`Width: ${boardService.getBoardWidth()}`}
                p={theme.space[2]}
            />
            <StyledSlider
                value={boardService.getBoardHeight()}
                min={10}
                max={100}
                onChange={handleHeightSlide}
                disabled={simulationService.shouldDisableSimulationControls()}
                label={`Height: ${boardService.getBoardHeight()}`}
                p={theme.space[2]}
            />
            <StyledSlider
                value={simulationService.getSimulationSpeed()}
                min={1}
                max={1000}
                onChange={handleSpeedSlide}
                disabled={simulationService.shouldDisableSimulationControls()}
                label={`Speed: ${simulationService.getSimulationSpeed()}`}
                p={theme.space[2]}
            />
        </>
    )
}
