import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSimulationService } from '../../hooks/SimulationService'

export const SimulationSetExecutionSpeedInfoBar: React.FC = () => {
    const simulationService = useSimulationService()

    return (
        <Paragraph p={1}>
            Set execution speed: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationService.getSimulationSpeed()}ms
            </Span>
        </Paragraph>
    )
}
