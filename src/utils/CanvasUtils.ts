export const resizeCanvas = (canvas: HTMLCanvasElement): boolean => {
    const { width, height } = canvas.getBoundingClientRect()
    const { devicePixelRatio: ratio = 1 } = window

    if (canvas.width !== width || canvas.height !== height) {
        const context = canvas.getContext('2d')
        if (context == null) return false
        canvas.width = Math.floor(width * ratio)
        canvas.height = Math.floor(height * ratio)
        return true
    }
    return false
}
