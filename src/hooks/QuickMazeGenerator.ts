import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { Maze } from '../classes/model/Maze'
import { DepthFirstSearchMazeGenerator } from '../classes/mazeGenerators/DepthFirstSearchMazeGenerator'
import { Coordinate } from '../utils/Coordinate'
import { boardActionDispatcher } from '../store/board/actions'

export const useQuickMazeGenerator = () => {
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const quicklyGenerateMaze = () => {
        let maze = new Maze(boardState.boardWidth, boardState.boardHeight)
        const mazeGenAlgo = new DepthFirstSearchMazeGenerator(maze, new Coordinate(0, 0))

        while (!mazeGenAlgo.getIsAlgorithmFinished()) {
            maze = mazeGenAlgo.step()
        }
        boardActionDispatcher.setBoard(maze)
    }

    return { quicklyGenerateMaze }
}
