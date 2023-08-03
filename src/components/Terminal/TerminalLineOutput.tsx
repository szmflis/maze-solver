import React from 'react'
import { Paragraph, Span } from '../Typography/Typography'
import { generateUUID } from '../../utils/TerminalUtils'
import { LogPart, Step } from '../../classes/model/Step'

interface TerminalLineOutputProps {
    step: Step
    key: string
}

export const TerminalLineOutput: React.FC<TerminalLineOutputProps> = (
    props
) => {
    return (
        <Paragraph>
            {props.step.getLogParts().map((part: LogPart) =>
                <Span
                    textColor={part.color}
                    paddingLeft={'5px'}
                    fontWeight={part.color === 'white' ? 400 : 600}
                    key={generateUUID()}
                >{part.text}</Span>
            )}
        </Paragraph>
    )
}
