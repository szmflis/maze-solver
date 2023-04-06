import React from 'react'
import { useSelector } from 'react-redux'
import { useDepthFirstSearchMazeGenerator } from '../../classes/DepthFirstSearchMazeGenerator'
import { AppState } from '../../store'
import { boardActionDispatcher } from '../../store/board/actions'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { theme } from '../../styles/theme'
import { Coordinate } from '../../utils/Coordinate'
import { StyledCard } from '../Card/Card'
import { FlexBox } from '../FlexBox/FlexBox'
import { StyledSlider } from '../Slider/Slider'
import { Button } from '../Button/Button'
import { Board } from '../../classes/Board'
import { Terminal } from '../Terminal/Terminal'

/*
    in general divide this further so no unecessary updates happen
*/

export const ControlPanel: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)
    const simulationService = useDepthFirstSearchMazeGenerator(new Coordinate(0, 0))

    const resetSimulation = () => {
        simulationActionDispatcher.resetSimulation()
        boardActionDispatcher.setBoard(
            new Board(boardState.boardWidth, boardState.boardHeight))
    }

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

        <StyledCard
            header={'Control Center'}
            flexGrow={1}
        >
            <FlexBox
                flexDirection={'column'}
                alignItems={'center'}
            >
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

                <FlexBox
                    width="100%"
                    justifyContent="space-evenly"
                    marginTop={theme.space[2]}
                >
                    <Button
                        onClick={() => simulationActionDispatcher.startSimulation()}
                        disabled={simulationState.isRunning}
                        variant='primary'
                    >
                    Start
                    </Button>
                    <Button
                        onClick={() => simulationActionDispatcher.stopSimulation()}
                        variant='warning'
                    >
                    Stop
                    </Button>
                    <Button
                        onClick={() => resetSimulation()}
                        variant='cancel'
                        disabled={simulationState.isRunning}
                    >
                    Reset
                    </Button>
                    <Button
                        onClick={() => simulationService.step()}
                        disabled={simulationState.isRunning}
                        variant='primary'
                    >
                    Step
                    </Button>
                </FlexBox>

            </FlexBox>

        </StyledCard>
    )

}
