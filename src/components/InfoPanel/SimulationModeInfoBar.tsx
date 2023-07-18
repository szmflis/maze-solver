import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

export const simulationModeDescriptionMapper = {
    MAZE_GEN: 'Maze Generation',
    MAZE_SOLVE: 'Maze Solving',
    MAZE_DRAW: 'Maze Drawing'
}

export const SimulationModeInfoBar: React.FC = () => {
    const simulationState = useSelector((state: AppState) =>
        state.simulationReducer)

    return (
        <Paragraph p={1}>
        Simulation mode: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationModeDescriptionMapper[simulationState.simulationMode]}
            </Span>
        </Paragraph>
    )
}
