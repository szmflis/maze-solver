import React from 'react'
import { StyledCard } from '../Card/Card'
import { FlexBox } from '../FlexBox/FlexBox'
import { Terminal } from '../Terminal/Terminal'
import { useDepthFirstSearchMazeGenerator } from '../../classes/DepthFirstSearchMazeGenerator'
import { Coordinate } from '../../utils/Coordinate'
import { ControlPanel } from './ControlPanel'

export const StateController: React.FC = () => {

    return (
        <>
            <FlexBox>
                {/* <StyledCard
                    header={'Statistics'}
                    flexGrow={1}
                >
                    x
                </StyledCard> */}

                <ControlPanel />
            </FlexBox>
            <FlexBox>
                <StyledCard
                    header={'Terminal'}
                    // flexGrow={1}
                >
                    <Terminal />
                </StyledCard>
            </FlexBox>
        </>
    )
}
