// import { Direction } from '../enums/Direction'
// import { MazeGenerator } from '../hooks/SimulationRunnerService'
// import { simulationActionDispatcher } from '../store/simulation/actions'
// import { Coordinate } from '../utils/Coordinate'
// import { getRandomDirectionFrom, getRandomNumberInRange } from '../utils/GeneratorUtils'
// import { Board } from './Board'
// import { CellState } from './Cell'

// export class DepthFirstSearchMazeGenerator implements MazeGenerator {
//     private readonly simulationBoard: Board
//     private position: Coordinate

//     constructor (board: Board, startingPosition: Coordinate) {
//         this.simulationBoard = board
//         this.position = startingPosition
//     }

//     public step (): Board {
//         this.generateNewBoard(this.position)
//         return this.simulationBoard
//     }

//     generateNewBoard (fromCoord: Coordinate) {
//         const allDirections = this.getAllDirections(fromCoord)
//         const availableUnvisitedDirections = this.getUnvisitedDirecitons(allDirections)
//         console.log(availableUnvisitedDirections)

//         if (availableUnvisitedDirections.length === 0) {
//             const availableVisitedDirections = this.getVisitedDirections(allDirections)
//             if (availableVisitedDirections.length === 0) {
//                 this.finishGeneration()
//             } else {
//                 this.moveBackToVisitedDirection(fromCoord, availableVisitedDirections)
//             }
//         } else {
//             this.moveToUnvisitedDirection(fromCoord, availableUnvisitedDirections)
//         }
//     }

//     finishGeneration () {
//         console.log('generation finished')
//         simulationActionDispatcher.finishSimulation()
//     }

//     moveToUnvisitedDirection (fromCoord: Coordinate, availableUnvisitedDirections: Direction[]) {

//         const randomDirection = getRandomDirectionFrom(availableUnvisitedDirections)
//         if (randomDirection.direction === 'LEFT') {
//             const nextCoord = new Coordinate(fromCoord.x - 1, fromCoord.y)
//             this.simulationBoard.removeLeftWall(this.position)
//             this.simulationBoard.removeRightWall(nextCoord)
//             this.simulationBoard.setCellState(this.position, CellState.VISITED)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//         }

//         if (randomDirection.direction === 'RIGHT') {
//             const nextCoord = new Coordinate(fromCoord.x + 1, fromCoord.y)
//             this.simulationBoard.removeRightWall(this.position)
//             this.simulationBoard.removeLeftWall(nextCoord)
//             this.simulationBoard.setCellState(this.position, CellState.VISITED)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//         }

//         if (randomDirection.direction === 'TOP') {
//             const nextCoord = new Coordinate(fromCoord.x, fromCoord.y - 1)
//             this.simulationBoard.removeTopWall(this.position)
//             this.simulationBoard.removeBottomWall(nextCoord)
//             this.simulationBoard.setCellState(this.position, CellState.VISITED)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//         }

//         if (randomDirection.direction === 'BOTTOM') {
//             const nextCoord = new Coordinate(fromCoord.x, fromCoord.y + 1)
//             this.simulationBoard.removeBottomWall(this.position)
//             this.simulationBoard.removeTopWall(nextCoord)
//             this.simulationBoard.setCellState(this.position, CellState.VISITED, true)
//             this.simulationBoard.setCellState(nextCoord, CellState.PLAYER, true)
//             this.position = nextCoord
//         }
//     }

//     moveBackToVisitedDirection (fromCoord: Coordinate, availableVisitedDirections: Direction[]) {
//         const currentCell = this.simulationBoard.getBoardCellAt(this.position.x, this.position.y)
//         if (!currentCell) return
//         const randomChosenDirection = availableVisitedDirections[0]
//         const randomChosenCell = randomChosenDirection.cell
//         if (!randomChosenCell) return
//         switch (randomChosenDirection.direction) {
//         case 'LEFT': {
//             const nextCoord = new Coordinate(fromCoord.x - 1, fromCoord.y)
//             this.simulationBoard.setCellState(this.position, CellState.AIR)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//             return false
//         }
//         case 'RIGHT': {
//             const nextCoord = new Coordinate(fromCoord.x + 1, fromCoord.y)
//             this.simulationBoard.setCellState(this.position, CellState.AIR)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//             return false
//         }
//         case 'TOP': {
//             const nextCoord = new Coordinate(fromCoord.x, fromCoord.y - 1)
//             this.simulationBoard.setCellState(this.position, CellState.AIR)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//             return false
//         }
//         case 'BOTTOM': {
//             const nextCoord = new Coordinate(fromCoord.x, fromCoord.y + 1)
//             this.simulationBoard.setCellState(this.position, CellState.AIR)
//             this.position = nextCoord
//             this.simulationBoard.setCellState(this.position, CellState.PLAYER)
//             return false
//         }
//         }
//     }

//     getAllDirections (forCoordinate: Coordinate): Direction[] {
//         const left: Direction = {
//             cell: this.simulationBoard.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
//             direction: 'LEFT'
//         }
//         const right: Direction = {
//             cell: this.simulationBoard.getBoardCellAt(forCoordinate.x + 1, forCoordinate.y),
//             direction: 'RIGHT'
//         }
//         const top: Direction = {
//             cell: this.simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
//             direction: 'TOP'
//         }
//         const bottom: Direction = {
//             cell: this.simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y + 1),
//             direction: 'BOTTOM'
//         }
//         return [left, right, top, bottom]
//     }

//     getUnvisitedDirecitons (directions: Direction[]): Direction[] {
//         return directions.filter(
//             dir => dir.cell !== null &&
//             (dir.cell.getState() === CellState.UNVISITED))
//     }

//     getVisitedDirections (directions: Direction[]): Direction[] {
//         const adjecentVisitedDirecitons = directions.filter(
//             dir => dir.cell !== null &&
//             dir.cell.getState() !== CellState.AIR)

//         return adjecentVisitedDirecitons.filter(dir => {
//             const adjectentCell = dir.cell
//             switch (dir.direction) {
//             case 'LEFT': {
//                 if (adjectentCell) return !adjectentCell.getWalls()[1]
//                 break
//             }
//             case 'RIGHT': {
//                 if (adjectentCell) return !adjectentCell.getWalls()[3]
//                 break
//             }
//             case 'TOP': {
//                 if (adjectentCell) return !adjectentCell.getWalls()[2]
//                 break
//             }
//             case 'BOTTOM': {
//                 if (adjectentCell) return !adjectentCell.getWalls()[0]
//                 break
//             }
//             }
//             return false
//         })
//     }

//     getBoard (): Board {
//         return this.simulationBoard
//     }

//     getRandomDirection (directions: Direction[]): Direction {
//         const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
//         return Object.values(directions)[randomInt]
//     }

// }
export {}
