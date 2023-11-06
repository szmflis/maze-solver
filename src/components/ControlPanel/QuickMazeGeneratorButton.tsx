import React from 'react'
import { useQuickMazeGenerator } from '../../hooks/QuickMazeGenerator'
import { Button } from '../Button/Button'
import { useSimulationService } from '../../hooks/SimulationService'

export const QuickMazeGeneratorButton: React.FC = () => {
    const quickMazeGen = useQuickMazeGenerator()
    const simulationService = useSimulationService()

    return <Button
        variant="primary"
        onClick={() => quickMazeGen.quicklyGenerateMaze()}
        disabled={simulationService.isSimulationRunning()}
        mt={3}
    >
        quickgen
    </Button>
}
