import { useSelector } from 'react-redux'
import { AppState } from '../store'

export const useBoardService = () => {
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const getBoardWidth = () => boardState.boardWidth
    const getBoardHeight = () => boardState.boardHeight

    return { getBoardWidth, getBoardHeight }
}
