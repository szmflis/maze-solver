import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { SimulationCanvas } from './Canvas'
import { FlexBox } from './FlexBox/FlexBox'
import { StateController } from './StateController/StateController'

const StyledApplicationContainer = styled(FlexBox)`
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: ${theme.space[1]};
`

export const ApplicationContainer: React.FC = () => {
    return (
        <StyledApplicationContainer>
            <SimulationCanvas />
            <StateController />
        </StyledApplicationContainer>
    )
}
