import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { generateUUID } from '../../utils/TerminalUtils'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { TerminalStepsStackOutput } from './TerminalStepsStackOutput'
import { Paragraph } from '../Typography/Typography'

const StyledTerminalContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.black};
    width: 100%;
    height: 300px;
    overflow-y: auto;
    font-family: ${theme.fonts.roboto};
    padding: ${theme.space[1]};
`

export const Terminal: React.FC = () => {

    const stepsHistory = useSelector((state: AppState) =>
        state.statisticsReducer.stepsHistory)

    const messagesEndRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [stepsHistory])

    return (
        <StyledTerminalContainer>
            {stepsHistory.length === 0
                ? <Paragraph>
                    Waiting for output
                </Paragraph>
                : stepsHistory.map(stepStack =>
                    <TerminalStepsStackOutput
                        key={generateUUID()}
                        stepStack={stepStack}/>
                )}

            <div ref={messagesEndRef} />
        </StyledTerminalContainer>
    )
}

/*
    TODO:
        maze solving algos mode
            first implement a quick maze gen
        maze saving&loading
        maze solving algos
        maze gen by drawing
        maze gen algos
*/
