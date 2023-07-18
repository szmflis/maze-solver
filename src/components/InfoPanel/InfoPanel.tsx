import React from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Paragraph, Span } from '../Typography/Typography'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

const simulationModeDescriptionMapper = {
    MAZE_GEN: 'Maze Generation',
    MAZE_SOLVE: 'Maze Solving',
    MAZE_DRAW: 'Maze Drawing'
}

const simulationAlgorithmDescriptionMapper = {
    BINARY_TREE: 'Binary Tree',
    DEPTH_FIRST_SEARCH: 'Depth-First Search'
}

export const InfoPanel: React.FC = () => {
    const simulationState = useSelector((state: AppState) =>
        state.simulationReducer)
    const statisticsState = useSelector((state: AppState) =>
        state.statisticsReducer)

    return <FlexBox flexDirection={'column'}>
        <Paragraph p={1}>
            Simulation mode: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationModeDescriptionMapper[simulationState.simulationMode]}
            </Span>
        </Paragraph>
        <Paragraph p={1}>
            Algorithm: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationAlgorithmDescriptionMapper[simulationState.mazeGenerationAlgorithm]}
            </Span>
        </Paragraph>
        <Paragraph p={1}>
            Step number: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationState.simulationStep}
            </Span>
        </Paragraph>
        <Paragraph p={1}>
            Set execution speed: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationState.simulationSpeed}ms
            </Span>
        </Paragraph>
        <Paragraph p={1}>
            Last measured execution speed: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {statisticsState.measuredSpeed}ms
            </Span>
        </Paragraph>
    </FlexBox>
}
