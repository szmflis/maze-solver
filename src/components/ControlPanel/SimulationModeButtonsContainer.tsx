import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { SimulationMode } from '../../store/simulation/types'
import { useBoardService } from '../../hooks/BoardService'

export const SimulationModeButtonsContainer: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardService = useBoardService()

    const setSimulationMode = (simMode: SimulationMode) => {
        if (simMode === 'MAZE_GEN') {
            boardService.resetBoard()
        }
        simulationActionDispatcher.setSimulationModeAlogrithm(simMode)
        boardService.unvisitBoardWithEntryAndExit()
    }

    return (
        <FlexBox
            width="100%"
            justifyContent="space-evenly"
            marginBottom={theme.space[2]}
        >
            <Button
                onClick={() => setSimulationMode('MAZE_GEN')}
                disabled={simulationState.isRunning}
                variant={simulationState.simulationMode === 'MAZE_GEN' ? 'primary' : 'secondary'}
            >
                        Generation
            </Button>
            <Button
                onClick={() => setSimulationMode('MAZE_SOLVE')}
                disabled={simulationState.isRunning}
                variant={simulationState.simulationMode === 'MAZE_SOLVE' ? 'primary' : 'secondary'}
            >
                        Solving
            </Button>
            <Button
                onClick={() => setSimulationMode('MAZE_DRAW')}
                disabled={simulationState.isRunning}
                variant={simulationState.simulationMode === 'MAZE_DRAW' ? 'primary' : 'secondary'}
            >
                        Drawing
            </Button>
        </FlexBox>
    )
}
