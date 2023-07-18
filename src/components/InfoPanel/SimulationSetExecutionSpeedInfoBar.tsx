import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

export const SimulationSetExecutionSpeedInfoBar: React.FC = () => {
    const simulationState = useSelector((state: AppState) =>
        state.simulationReducer)

    return (
        <Paragraph p={1}>
            Set execution speed: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationState.simulationSpeed}ms
            </Span>
        </Paragraph>
    )
}
