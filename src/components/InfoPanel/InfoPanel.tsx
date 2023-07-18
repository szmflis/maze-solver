import React from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { SimulationModeInfoBar } from './SimulationModeInfoBar'
import { SimulationAlgorithmInfoBar } from './SimulationAlgorithmInfoBar'
import { SimulationStepCounterInfoBar } from './SimulationStepCounterInfoBar'
import { SimulationSetExecutionSpeedInfoBar } from './SimulationSetExecutionSpeedInfoBar'
import { SimulationMeasuredExecutionSpeedInfoBar } from './SimulationMeasuredExecutionSpeedInfoBar'

export const InfoPanel: React.FC = () => {

    return <FlexBox flexDirection={'column'}>
        <SimulationModeInfoBar />
        <SimulationAlgorithmInfoBar />
        <SimulationStepCounterInfoBar />
        <SimulationSetExecutionSpeedInfoBar />
        <SimulationMeasuredExecutionSpeedInfoBar />
    </FlexBox>
}
