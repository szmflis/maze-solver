import React, { useEffect, useState } from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Option } from '../Select/RawSelect'
import { Select } from '../Select/Select'
import { MazeGenAlgorithm, MazeSolveAlgorithm } from '../../store/simulation/types'
import { useSimulationService } from '../../hooks/SimulationService'

interface MazeGenAlgorithmOption extends Option {
    value: MazeGenAlgorithm
}

const MAZE_GEN_ALGORITHM_OPTIONS: MazeGenAlgorithmOption[] = [
    {
        value: 'DEPTH_FIRST_SEARCH',
        display: 'Depth First Search'
    },
    {
        value: 'BINARY_TREE',
        display: 'Binary Tree'
    },
    {
        value: 'HUNT_AND_KILL',
        display: 'Hunt and Kill'
    }
]

interface MazeSolveAlgorithmOption extends Option {
    value: MazeSolveAlgorithm
}

const MAZE_SOLVE_ALGORITHM_OPTIONS: MazeSolveAlgorithmOption[] = [
    {
        value: 'DEPTH_FIRST_SEARCH',
        display: 'Depth First Search'
    }
]

export const AlgorithmSelector: React.FC = () => {
    const [selectValue, setSelectValue] = useState(0)

    const simulationService = useSimulationService()

    useEffect(() => {
        simulationService.setMazeGeneratingAlgorithm(MAZE_GEN_ALGORITHM_OPTIONS[selectValue].value)
    }, [selectValue])

    const getDataForSelection = () => {
        switch (simulationService.getSimulationMode()) {
        case 'MAZE_GEN': {
            return MAZE_GEN_ALGORITHM_OPTIONS
        }
        case 'MAZE_SOLVE': {
            return MAZE_SOLVE_ALGORITHM_OPTIONS
        }
        }
    }

    return (
        <FlexBox
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Select
                data={getDataForSelection()}
                selectedOption={selectValue}
                setSelectedOption={setSelectValue}
                disabled={simulationService.shouldDisableSimulationControls()}
            />
        </FlexBox>
    )
}
