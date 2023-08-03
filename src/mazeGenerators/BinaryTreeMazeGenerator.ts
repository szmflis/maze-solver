import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Direction } from '../enums/Direction'
import { useInterval } from '../hooks/useInterval'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { Maze } from '../classes/model/Maze'

export const useBinaryTreeMazeGenerator = (
    initPosition: Coordinate
) => {
    const [position, setPosition] = useState<Coordinate>(initPosition)
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const simulationBoard = useSelector((state: AppState) => state.boardReducer.board)

    useInterval(() => {
        step()
    }, simulationState.isRunning ? 10 : null)

    const step = (): void => {
        if (simulationState.simulationStep === 0) {
            boardActionDispatcher.unvisitEntireBoard()
        }
        boardActionDispatcher.setBoard(generateNewBoard())
        simulationActionDispatcher.incrementSimulationStep()
    }

    const generateNewBoard = (): Maze => {
        const newBoard = new Maze(
            simulationBoard.getBoardWidth(),
            simulationBoard.getBoardHeight(),
            simulationBoard.getBoard())
        const availableDirections: Direction[] = getDirections(position)
        const randomDirection = getRandomDirection(availableDirections)
        if (randomDirection.direction === 'LEFT' && randomDirection.cell !== null) {
            const coordToTheLeft = new Coordinate(position.x - 1, position.y)
            newBoard.removeRightWall(coordToTheLeft)
            newBoard.removeLeftWall(position)
        }
        if (randomDirection.direction === 'TOP' && randomDirection.cell !== null) {
            const coordToTheTop = new Coordinate(position.x, position.y - 1)
            newBoard.removeBottomWall(coordToTheTop)
            newBoard.removeTopWall(position)
        }
        setNewPosition()
        return newBoard
    }

    const setNewPosition = () => {
        if (position.x === simulationBoard.getBoardWidth() - 1 &&
            position.y === simulationBoard.getBoardHeight() - 1) {
            finishGeneration()
        }
        if (position.x === simulationBoard.getBoardWidth() - 1) {
            setPosition(new Coordinate(0, position.y + 1))
        } else {
            setPosition(new Coordinate(position.x + 1, position.y))
        }
    }

    const getDirections = (forCoordinate: Coordinate): Direction[] => {
        const left: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
            direction: 'LEFT'
        }
        const top: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
            direction: 'TOP'
        }
        return [left, top]
    }

    const getRandomDirection = (directions: Direction[]): Direction => {
        const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
        return Object.values(directions)[randomInt]
    }

    const finishGeneration = () => {
        // console.log('generation finished')
        simulationActionDispatcher.finishSimulation()
    }

    return { step }
}
