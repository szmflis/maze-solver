import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Direction } from '../enums/Direction'
import { useInterval } from '../hooks/useInterval'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { getRandomDirectionFrom } from '../utils/GeneratorUtils'
import { Board } from './Board'
import { CellState } from './Cell'
import { DepthFirstSearchTerminalLogger } from './DepthFirstSearchTerminalLogger'

export const useDepthFirstSearchMazeGenerator = (
    initPosition: Coordinate
) => {
    const [position, setPosition] = useState<Coordinate>(initPosition)
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const simulationBoard = useSelector((state: AppState) => state.boardReducer.board)

    const logger = new DepthFirstSearchTerminalLogger()

    useInterval(() => {
        step()
    }, simulationState.isRunning ? 10 : null)

    const step = (): void => {
        if (simulationState.simulationStep === 0) {
            boardActionDispatcher.checkEntireBoard()
        }
        generateNewBoard(position)
        simulationActionDispatcher.incrementSimulationStep()
        logger.commitStack()
    }

    const generateNewBoard = (fromCoord: Coordinate) => {
        let newBoard = new Board(
            simulationBoard.getBoardWidth(),
            simulationBoard.getBoardHeight(),
            simulationBoard.getBoard())

        const allDirections = getAllDirections(fromCoord)
        logger.addSearchStep(allDirections, 'possible directions')
        const availableUnvisitedDirections = getUnvisitedDirecitons(allDirections)
        logger.addSearchStep(availableUnvisitedDirections, 'Unvisited directions')
        if (availableUnvisitedDirections.length === 0) {
            logger.addFoundNoUnvisited()
            const availableVisitedDirections = getVisitedDirections(allDirections)
            logger.addSearchStep(availableVisitedDirections, 'visited directions')
            if (availableVisitedDirections.length === 0) {
                finishGeneration()
            } else {
                newBoard = moveBackToVisitedDirection(fromCoord, availableVisitedDirections, newBoard)
            }
        } else {
            newBoard = moveToUnvisitedDirection(fromCoord, availableUnvisitedDirections, newBoard)
        }
        boardActionDispatcher.setBoard(newBoard)
    }

    const finishGeneration = () => {
        console.log('generation finished')
        simulationActionDispatcher.finishSimulation()
        logger.addGenerationFinish()
    }

    const moveToUnvisitedDirection = (
        fromCoord: Coordinate,
        availableUnvisitedDirections: Direction[],
        inputBoard: Board
    ): Board => {
        const randomDirection = getRandomDirectionFrom(availableUnvisitedDirections)
        const nextCoord = getNextCoordinate(fromCoord, randomDirection)

        if (randomDirection.direction === 'LEFT') {
            inputBoard.removeLeftWall(position)
            inputBoard.removeRightWall(nextCoord)
        }

        if (randomDirection.direction === 'RIGHT') {
            inputBoard.removeRightWall(position)
            inputBoard.removeLeftWall(nextCoord)
        }

        if (randomDirection.direction === 'TOP') {
            inputBoard.removeTopWall(position)
            inputBoard.removeBottomWall(nextCoord)
        }

        if (randomDirection.direction === 'BOTTOM') {
            inputBoard.removeBottomWall(position)
            inputBoard.removeTopWall(nextCoord)
        }

        logger.addMoveStep(nextCoord)
        logger.addSetStep(position, 'VISITED')
        logger.addSetStep(nextCoord, 'PLAYER')
        inputBoard.setCellState(position, CellState.VISITED)
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        setPosition(nextCoord)
        return inputBoard
    }

    const moveBackToVisitedDirection = (
        fromCoord: Coordinate,
        availableVisitedDirections: Direction[],
        inputBoard: Board
    ): Board => {
        const currentCell = simulationBoard.getBoardCellAt(position.x, position.y)
        if (!currentCell) return inputBoard
        const randomChosenDirection = availableVisitedDirections[0]
        const randomChosenCell = randomChosenDirection.cell
        if (!randomChosenCell) return inputBoard

        const nextCoord = getNextCoordinate(fromCoord, randomChosenDirection)
        logger.addMoveStep(nextCoord)
        inputBoard.setCellState(position, CellState.AIR)
        logger.addSetStep(position, 'VISITED')
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        logger.addSetStep(nextCoord, 'PLAYER')
        setPosition(nextCoord)
        return inputBoard
    }

    const getNextCoordinate = (fromCoord: Coordinate, direction: Direction) => {
        switch (direction.direction) {
        case 'LEFT': return new Coordinate(fromCoord.x - 1, fromCoord.y)
        case 'BOTTOM': return new Coordinate(fromCoord.x, fromCoord.y + 1)
        case 'RIGHT': return new Coordinate(fromCoord.x + 1, fromCoord.y)
        case 'TOP': return new Coordinate(fromCoord.x, fromCoord.y - 1)
        }
    }

    const getAllDirections = (forCoordinate: Coordinate): Direction[] => {
        const left: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
            direction: 'LEFT'
        }
        const right: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x + 1, forCoordinate.y),
            direction: 'RIGHT'
        }
        const top: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
            direction: 'TOP'
        }
        const bottom: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y + 1),
            direction: 'BOTTOM'
        }
        return [left, right, top, bottom]
    }

    const getUnvisitedDirecitons = (directions: Direction[]): Direction[] => {
        return directions.filter(
            dir => dir.cell !== null &&
            (dir.cell.getState() === CellState.UNVISITED))
    }

    const getVisitedDirections = (directions: Direction[]): Direction[] => {
        const adjecentVisitedDirecitons = directions.filter(
            dir => dir.cell !== null &&
            dir.cell.getState() !== CellState.AIR)

        return adjecentVisitedDirecitons.filter(dir => {
            const adjectentCell = dir.cell
            switch (dir.direction) {
            case 'LEFT': {
                if (adjectentCell) return !adjectentCell.getWalls()[1]
                break
            }
            case 'RIGHT': {
                if (adjectentCell) return !adjectentCell.getWalls()[3]
                break
            }
            case 'TOP': {
                if (adjectentCell) return !adjectentCell.getWalls()[2]
                break
            }
            case 'BOTTOM': {
                if (adjectentCell) return !adjectentCell.getWalls()[0]
                break
            }
            }
            return false
        })
    }

    return { step }
}
