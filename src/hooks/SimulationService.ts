import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    useEffect(() => {
        if (!simulationState.isRunning) return
        const timer = setInterval(() => {
            printSimulationBoard()
        }, 200)
        return () => {
            clearInterval(timer)
        }
    }, [simulationState.isRunning])

    const printSimulationBoard = () => {
        console.log(simulationState.boardWidth)
        const randomRow = Math.floor(Math.random() * simulationState.boardHeight)
        const randomCol = Math.floor(Math.random() * simulationState.boardWidth)

        const oneOrZero = Math.floor(Math.random() * 2)
        if (oneOrZero === 1) {
            simulationActionDispatcher.checkBoardCellState(new Coordinate(randomCol, randomRow))
        } else {
            simulationActionDispatcher.uncheckBoardCellState(new Coordinate(randomCol, randomRow))
        }
    }

}
