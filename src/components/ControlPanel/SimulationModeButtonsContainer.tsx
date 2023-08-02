import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { SimulationMode } from '../../store/simulation/types'

export const SimulationModeButtonsContainer: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const setSimulationMode = (simMode: SimulationMode) => {
        simulationActionDispatcher.setSimulationModeAlogrithm(simMode)
        boardState.board.setBoardToUnvisited()
    }

    return (
        <FlexBox
            width="100%"
            justifyContent="space-evenly"
            marginTop={theme.space[2]}
        >
            <Button
                onClick={() => setSimulationMode('MAZE_GEN')}
                disabled={simulationState.isRunning}
                variant={simulationState.simulationMode === 'MAZE_GEN' ? 'success' : 'disabled'}
            >
                        Generation
            </Button>
            <Button
                onClick={() => setSimulationMode('MAZE_SOLVE')}
                disabled={simulationState.isRunning}
                variant={simulationState.simulationMode === 'MAZE_SOLVE' ? 'success' : 'disabled'}
            >
                        Solving
            </Button>
            <Button
                onClick={() => setSimulationMode('MAZE_DRAW')}
                disabled={simulationState.isRunning}
                variant={simulationState.simulationMode === 'MAZE_DRAW' ? 'success' : 'disabled'}
            >
                        Drawing
            </Button>
        </FlexBox>
    )
}
