import React from 'react'
import { StyledCard } from '../Card/Card'
import { FlexBox } from '../FlexBox/FlexBox'
import { Terminal } from '../Terminal/Terminal'
import { ControlPanel } from '../ControlPanel/ControlPanel'

export const StateController: React.FC = () => {
    return (
        <>
            <FlexBox>
                <ControlPanel />
            </FlexBox>
            <FlexBox>
                <StyledCard
                    header={'Terminal'}
                    width={'100%'}
                >
                    <Terminal />
                </StyledCard>
            </FlexBox>
        </>
    )
}
