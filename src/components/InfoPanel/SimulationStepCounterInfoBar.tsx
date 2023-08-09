import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { useSimulationService } from '../../hooks/SimulationService'

export const SimulationStepCounterInfoBar: React.FC = () => {
    const simulationService = useSimulationService()

    return (
        <Paragraph p={1}>
            Step number: <Span
                textColor='red'
                fontWeight={'bold'}
            >
                {simulationService.getSimulationStep()}
            </Span>
        </Paragraph>
    )
}
