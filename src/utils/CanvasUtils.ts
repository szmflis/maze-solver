export const resizeCanvas = (canvas: HTMLCanvasElement): boolean => {
    const { width, height } = canvas.getBoundingClientRect()
    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window
        const context = canvas.getContext('2d')
        if (context == null) return false
        canvas.width = Math.floor(width * ratio)
        canvas.height = Math.floor(height * ratio)
        // context.scale(ratio, ratio)

        return true
    }
    return false
}
