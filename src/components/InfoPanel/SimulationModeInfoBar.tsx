import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSimulationService } from '../../hooks/SimulationService'

export const simulationModeDescriptionMapper = {
    MAZE_GEN: 'Maze Generation',
    MAZE_SOLVE: 'Maze Solving',
    MAZE_DRAW: 'Maze Drawing'
}

export const SimulationModeInfoBar: React.FC = () => {
    const simulationService = useSimulationService()

    return (
        <Paragraph p={1}>
        Simulation mode: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationModeDescriptionMapper[simulationService.getSimulationMode()]}
            </Span>
        </Paragraph>
    )
}
