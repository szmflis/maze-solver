import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSimulationService } from '../../hooks/SimulationService'

export const simulationAlgorithmDescriptionMapper = {
    BINARY_TREE: 'Binary Tree',
    DEPTH_FIRST_SEARCH: 'Depth-First Search',
    HUNT_AND_KILL: 'Hunt and Kill'
}

export const SimulationAlgorithmInfoBar: React.FC = () => {

    const simulationService = useSimulationService()

    return (
        <Paragraph p={1}>
            Algorithm: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationAlgorithmDescriptionMapper[simulationService.getSimulationAlgorithm()]}
            </Span>
        </Paragraph>
    )
}
