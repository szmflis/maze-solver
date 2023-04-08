import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { boardActionDispatcher } from '../../store/board/actions'
import { theme } from '../../styles/theme'
import { StyledSlider } from '../Slider/Slider'

export const Sliders: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const shouldDisableSizeAdjustments = () => {
        if (simulationState.isRunning) return true
        if (!simulationState.isRunning && simulationState.simulationStep !== 0) return true
        return false
    }

    const handleWidthSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        boardActionDispatcher.changeBoardWidth(Number(event.target.value))
    }

    const handleHeightSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
        boardActionDispatcher.changeBoardHeight(Number(event.target.value))
    }

    return (
        <>
            <StyledSlider
                value={boardState.boardWidth}
                min={10}
                max={100}
                onChange={handleWidthSlide}
                disabled={shouldDisableSizeAdjustments()}
                label={`Width: ${boardState.boardWidth}`}
                p={theme.space[2]}
            />
            <StyledSlider
                value={boardState.boardHeight}
                min={10}
                max={100}
                onChange={handleHeightSlide}
                disabled={shouldDisableSizeAdjustments()}
                label={`Height: ${boardState.boardHeight}`}
                p={theme.space[2]}
            />
        </>
    )
}
