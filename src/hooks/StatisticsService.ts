import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { statisticsActionDispatcher } from '../store/statistics/actions'

export const useStatisticsService = () => {
    const statisticsState = useSelector((state: AppState) => state.statisticsReducer)

    const setMeasuredExecutionTime = (measuredTime: number): void => {
        statisticsActionDispatcher.setMeasuredExecutionTime(measuredTime)
    }

    const clearStepStack = (): void => {
        statisticsActionDispatcher.clearStepStack()
    }

    return {
        setMeasuredExecutionTime,
        clearStepStack
    }
}
