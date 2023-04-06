import React from 'react'
import styled from 'styled-components'
import { FlexBox } from '../FlexBox/FlexBox'
import { Paragraph } from '../Typography/Typography'
import { Step } from '../../classes/Step'

const StyledTerminalContainer = styled(FlexBox)`

`

interface TerminalLineOutputProps {
    step: Step
    key: string
}

export const TerminalLineOutput: React.FC<TerminalLineOutputProps> = (
    props
) => {
    return (
        <div>
            {`Type ${props.step.getStepType()} \t\t Msg: ${props.step.getStepDescription()}`}
        </div>
    )
}
