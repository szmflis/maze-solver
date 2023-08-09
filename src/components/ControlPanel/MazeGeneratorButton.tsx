import React from 'react'
import { useQuickMazeGenerator } from '../../hooks/QuickMazeGenerator'
import { Button } from '../Button/Button'

export const QuickMazeGeneratorButton: React.FC = () => {
    const quickMazeGen = useQuickMazeGenerator()

    return <Button
        variant="primary"
        onClick={() => quickMazeGen.quicklyGenerateMaze()}
    >
        quickgen
    </Button>
}
