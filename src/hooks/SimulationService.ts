import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const [isRunning, setIsRunning] = useState(true)

    useEffect(() => {
        if (!isRunning) return
        const timer = setInterval(() => {
            printSimulationBoard()
        }, 200)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const printSimulationBoard = () => {
        const randomRow = Math.floor(Math.random() * 4)
        const randomCol = Math.floor(Math.random() * 4)

        const oneOrZero = Math.floor(Math.random() * 2)
        console.log(oneOrZero)
        if (oneOrZero === 1) {
            simulationActionDispatcher.checkBoardCellState(new Coordinate(randomRow, randomCol))
        } else {
            simulationActionDispatcher.uncheckBoardCellState(new Coordinate(randomRow, randomCol))
        }
    }

}
