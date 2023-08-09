import React from 'react'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { SimulationMode } from '../../store/simulation/types'
import { useBoardService } from '../../hooks/BoardService'
import { useSimulationService } from '../../hooks/SimulationService'

export const SimulationModeButtonsContainer: React.FC = () => {
    const boardService = useBoardService()
    const simulationService = useSimulationService()

    const setSimulationMode = (simMode: SimulationMode) => {
        if (simMode === 'MAZE_GEN') {
            boardService.resetBoard()
        }
        simulationService.setSimulationMode(simMode)
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
                disabled={simulationService.isSimulationRunning()}
                variant={simulationService.getSimulationMode() === 'MAZE_GEN' ? 'primary' : 'secondary'}
            >
                        Generation
            </Button>
            <Button
                onClick={() => setSimulationMode('MAZE_SOLVE')}
                disabled={simulationService.isSimulationRunning()}
                variant={simulationService.getSimulationMode() === 'MAZE_SOLVE' ? 'primary' : 'secondary'}
            >
                        Solving
            </Button>
            <Button
                onClick={() => setSimulationMode('MAZE_DRAW')}
                disabled={simulationService.isSimulationRunning()}
                variant={simulationService.getSimulationMode() === 'MAZE_DRAW' ? 'primary' : 'secondary'}
            >
                        Drawing
            </Button>
        </FlexBox>
    )
}
