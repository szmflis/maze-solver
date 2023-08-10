import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { statisticsActionDispatcher } from '../store/statistics/actions'

export const useStatisticsService = () => {
    const statisticsState = useSelector((state: AppState) => state.statisticsReducer)

    const setAlgorithmExecutionStartTime = () => {
        statisticsActionDispatcher.setExecutionStartTime(performance.now())
    }

    const setAlgorithmExecutionEndTime = () => {
        const time = performance.now()
        statisticsActionDispatcher.setExecutionEndTime(time)
    }

    const setMeasuredExecutionTime = (measuredTime: number): void => {
        statisticsActionDispatcher.setMeasuredExecutionTime(measuredTime)
    }

    const clearStepStack = (): void => {
        statisticsActionDispatcher.clearStepStack()
    }

    return {
        setMeasuredExecutionTime,
        clearStepStack,
        setAlgorithmExecutionStartTime,
        setAlgorithmExecutionEndTime
    }
}
