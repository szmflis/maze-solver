import React from 'react'
import { useSelector } from 'react-redux'
import { useDepthFirstSearchMazeGenerator } from '../classes/DepthFirstSearchMazeGenerator'
import { useBinaryTreeMazeGenerator } from '../mazeGenerators/BinaryTreeMazeGenerator'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { theme } from '../styles/theme'
import { Coordinate } from '../utils/Coordinate'
import { FlexBox } from './FlexBox/FlexBox'
import { StyledSlider } from './Slider/Slider'

export const StateController: React.FC = () => {

    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    // const simulationService = useBinaryTreeMazeGenerator(new Coordinate(0, 0))
    const simulationService = useDepthFirstSearchMazeGenerator(new Coordinate(0, 0))

    const test = () => {
        simulationActionDispatcher.resetSimulation()
        // simulationActionDispatcher.setBoard(new Board(10, 10))
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
        <div>
            <FlexBox
                backgroundColor={theme.colors.surfaceDarkest}
                maxWidth={'400px'}
                flexDirection={'column'}
                p={5}
            >
                <FlexBox pb={4}>
                    <StyledSlider
                        value={boardState.boardWidth}
                        min={10}
                        max={100}
                        onChange={handleWidthSlide}
                        disabled={simulationState.isRunning}
                        label={`Width: ${boardState.boardWidth}`}
                    />
                </FlexBox>

                <FlexBox pb={4}>
                    <StyledSlider
                        value={boardState.boardHeight}
                        min={10}
                        max={100}
                        onChange={handleHeightSlide}
                        disabled={simulationState.isRunning}
                        label={`Height: ${boardState.boardHeight}`}
                    />
                </FlexBox>
            </FlexBox>
            <button
                onClick={() => boardActionDispatcher.changeBoardWidth(boardState.boardWidth + 20)}
                disabled={shouldDisableSizeAdjustments()}
            >
                increase width
            </button>
            <button
                onClick={() => boardActionDispatcher.changeBoardHeight(boardState.boardHeight + 20)}
                disabled={shouldDisableSizeAdjustments()}
            >
                increase height
            </button>
            <button
                onClick={() => simulationActionDispatcher.startSimulation()}
                disabled={simulationState.isRunning}
            >
                start!
            </button>
            <button onClick={() => simulationActionDispatcher.stopSimulation()}>
                stop!
            </button>
            <button onClick={() => test()}>
                reset!
            </button>
            <button onClick={() => simulationService.step()}>
                step!
            </button>
            {simulationState.simulationStep}
        </div>
    )
}
