import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MazeGenerator } from '../classes/MazeGenerator'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { useInterval } from './useInterval'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const [steps, setSteps] = useState(0)
    const [mazeGen, setMazeGen] = useState<MazeGenerator>(new MazeGenerator(simulationState.board))

    useInterval(() => {
        printSimulationBoard(mazeGen)
    }, simulationState.isRunning ? 10 : null)

    useEffect(() => {
        setMazeGen(new MazeGenerator(simulationState.board))
    }, [simulationState.board])

    const printSimulationBoard = (mazeGenerator: MazeGenerator) => {
        if (steps === 0) {
            simulationActionDispatcher.checkEntireBoard()
        }
        const board = mazeGenerator.step()
        simulationActionDispatcher.setBoard(board)
        setSteps(steps + 1)
    }
}
