import React, { } from 'react'
import { TerminalLineOutput } from './TerminalLineOutput'
import { Step } from '../../classes/Step'
import { StepStack } from '../../classes/StepStack'
import { generateUUID } from '../../utils/TerminalUtils'

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
