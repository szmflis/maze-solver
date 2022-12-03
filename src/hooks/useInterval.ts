import { useEffect, useRef } from 'react'

export function useInterval (callback: () => void, delay: any) {
    const savedCallback = useRef<(() => void) | null>(null)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick () {
            if (savedCallback.current !== null) {
                savedCallback.current()
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
