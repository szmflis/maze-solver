// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { BinaryTreeMazeGenerator } from '../classes/BinaryTreeMazeGenerator'
// import { Board } from '../classes/Board'
// import { AppState } from '../store'
// import { simulationActionDispatcher } from '../store/simulation/actions'
// import { Coordinate } from '../utils/Coordinate'
// import { useInterval } from './useInterval'

// export interface MazeGenerator {
//     step: () => Board
// }

// export const useSimulationRunnerService = () => {
//     const simulationState = useSelector((state: AppState) => state.simulationReducer)
//     const [mazeGen, setMazeGen] = useState<MazeGenerator>(new BinaryTreeMazeGenerator(
//         simulationState.board,
//         new Coordinate(0, 0)))
//     // new Coordinate(getRandomNumberInRange(0, 10), getRandomNumberInRange(0, 10))))

//     useInterval(() => {
//         printSimulationBoard(mazeGen)
//     }, simulationState.isRunning ? 10 : null)

//     useEffect(() => {
//         // const entryCoordinate = new Coordinate(getRandomNumberInRange(0, 10), getRandomNumberInRange(0, 10))
//         const entryCoordinate = new Coordinate(0, 0)
//         setMazeGen(new BinaryTreeMazeGenerator(simulationState.board, entryCoordinate))
//     }, [simulationState.board])

//     const printSimulationBoard = (mazeGenerator: MazeGenerator) => {
//         if (simulationState.simulationStep === 0) {
//             simulationActionDispatcher.checkEntireBoard()
//         }
//         const board = mazeGenerator.step()
//         simulationActionDispatcher.setBoard(board)
//         simulationActionDispatcher.incrementSimulationStep()
//     }

//     const step = () => {
//         printSimulationBoard(mazeGen)
//     }

//     return { step }
// }
export {}
