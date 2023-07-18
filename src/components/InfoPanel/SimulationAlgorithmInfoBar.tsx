import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

export const simulationAlgorithmDescriptionMapper = {
    BINARY_TREE: 'Binary Tree',
    DEPTH_FIRST_SEARCH: 'Depth-First Search'
}

export const SimulationAlgorithmInfoBar: React.FC = () => {
    const simulationState = useSelector((state: AppState) =>
        state.simulationReducer)

    return (
        <Paragraph p={1}>
            Algorithm: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationAlgorithmDescriptionMapper[simulationState.mazeGenerationAlgorithm]}
            </Span>
        </Paragraph>
    )
}
