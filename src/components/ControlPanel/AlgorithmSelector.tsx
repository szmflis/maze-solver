import React, { useEffect, useState } from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Option } from '../Select/RawSelect'
import { Select } from '../Select/Select'
import { MazeGenAlgorithm } from '../../store/simulation/types'
import { useSimulationService } from '../../hooks/SimulationService'

interface MazeGenAlgorithmOption extends Option {
    value: MazeGenAlgorithm
}

const ALGORITHM_OPTIONS: MazeGenAlgorithmOption[] = [
    {
        value: 'DEPTH_FIRST_SEARCH',
        display: 'Depth First Search'
    },
    {
        value: 'BINARY_TREE',
        display: 'Binary Tree'
    }
]

export const AlgorithmSelector: React.FC = () => {
    const [value1, setValue1] = useState(0)

    const simulationService = useSimulationService()

    useEffect(() => {
        simulationService.setMazeGeneratingAlgorithm(ALGORITHM_OPTIONS[value1].value)
    }, [value1])

    return (
        <FlexBox
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Select
                data={ALGORITHM_OPTIONS}
                selectedOption={value1}
                setSelectedOption={setValue1}
                disabled={simulationService.shouldDisableSimulationControls()}
            />
        </FlexBox>
    )
}
