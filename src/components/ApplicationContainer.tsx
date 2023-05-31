import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { SimulationCanvas } from './Canvas'
import { FlexBox } from './FlexBox/FlexBox'
import { StyledCard } from './Card/Card'
import { Terminal } from './Terminal/Terminal'
import { ControlPanel } from './ControlPanel/ControlPanel'

const StyledApplicationContainer = styled(FlexBox)`
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: ${theme.space[1]};
`

export const ApplicationContainer: React.FC = () => {
    return (
        <StyledApplicationContainer>
            <FlexBox
                flexDirection={'row'}
                width="100%"
            >
                <StyledCard
                    header={'Control Center'}
                    width="100%"
                >
                    <ControlPanel />
                </StyledCard>

                <StyledCard
                    header='Canvas'
                    width="100%"
                >
                    <SimulationCanvas />
                </StyledCard>

            </FlexBox>
            <StyledCard
                header={'Terminal'}
            >
                <Terminal />
            </StyledCard>
        </StyledApplicationContainer>
    )
}
