import React, { } from 'react'
import { TerminalLineOutput } from './TerminalLineOutput'
import { generateUUID } from '../../utils/TerminalUtils'
import { StepStack } from '../../classes/model/StepStack'
import { Step } from '../../classes/model/Step'

interface TerminalStepsStackOutputProps {
    stepStack: StepStack
}

export const TerminalStepsStackOutput: React.FC<TerminalStepsStackOutputProps> = (
    props: TerminalStepsStackOutputProps
) => {

    return (
        <>
            {props.stepStack.getSteps().map((step: Step) => {
                return (
                    <TerminalLineOutput
                        key={generateUUID()}
                        step={step}
                    />
                )
            })}
        </>
    )
}
