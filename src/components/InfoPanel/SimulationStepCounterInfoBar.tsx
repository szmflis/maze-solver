import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

export const SimulationStepCounterInfoBar: React.FC = () => {
    const simulationState = useSelector((state: AppState) =>
        state.simulationReducer)

    return (
        <Paragraph p={1}>
            Step number: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationState.simulationStep}
            </Span>
        </Paragraph>
    )
}
