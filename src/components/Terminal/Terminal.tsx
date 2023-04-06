import React, { useEffect, useState } from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { TerminalLineOutput } from './TerminalLineOutput'
import { Step } from '../../classes/Step'
import { StepStack } from '../../classes/StepStack'
import { generateUUID } from '../../utils/TerminalUtils'

const StyledTerminalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* background-color: ${theme.colors.black}; */
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: block;
        width: 10px;
    }
`

export const Terminal: React.FC = () => {

    // const stepsHistory = useSelector((state: AppState) =>
    //     state.statisticsReducer.stepsHistory)

    const [stepsStack, setStepsStack] = useState(new StepStack())

    useEffect(() => {
        const dummyStep1: Step = new Step('MOVE', 'Found available directions to move to: [{}]')
        const dummyStep2: Step = new Step('MOVE', 'Removing wall to the: {} of current position')
        const dummyStep3: Step = new Step('MOVE', 'Setting current position to: {}')
        const dummyStep4: Step = new Step('MOVE',
            'Chosen to carve a path in direction {} to cell {}, that cell becomes the new cell.')
        const dummyStep5: Step = new Step('MOVE', 'Found available directions to move to: [{}]')

        const stepStack: StepStack = new StepStack()
        stepStack.addStep(dummyStep1)
        stepStack.addStep(dummyStep2)
        stepStack.addStep(dummyStep3)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep4)
        stepStack.addStep(dummyStep5)
        stepStack.addStep(dummyStep5)
        stepStack.addStep(dummyStep5)
        stepStack.addStep(dummyStep5)
        stepStack.addStep(dummyStep5)
        stepStack.addStep(dummyStep5)
        stepStack.addStep(dummyStep5)
        setStepsStack(stepStack)
    }, [])

    return (
        <StyledTerminalContainer>
            {stepsStack.getSteps().map((step: Step) => {
                console.log('going')
                return <TerminalLineOutput
                    key={generateUUID()}
                    step={step}
                />
            })}
        </StyledTerminalContainer>
    )
}
