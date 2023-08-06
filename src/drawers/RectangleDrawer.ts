import boardColors from '../styles/boardColors'

export const COLOR_MAP = new Map<string, string>([
    ['AIR', boardColors.air],
    ['UNVISITED', boardColors.unvisited],
    ['VISITED', boardColors.visited],
    ['PLAYER', boardColors.player],
    ['EXIT', boardColors.exit],
    ['ENTRY', boardColors.entry]
])

export {}
