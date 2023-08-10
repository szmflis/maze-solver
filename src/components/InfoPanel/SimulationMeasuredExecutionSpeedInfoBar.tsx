import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

export const SimulationMeasuredExecutionSpeedInfoBar: React.FC = () => {
    const statisticsState = useSelector((state: AppState) =>
        state.statisticsReducer)

    return (
        <Paragraph p={1}>
            Last measured execution speed: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {statisticsState.measuredAlgorithmExecutionTime}ms
            </Span>
        </Paragraph>
    )
}
