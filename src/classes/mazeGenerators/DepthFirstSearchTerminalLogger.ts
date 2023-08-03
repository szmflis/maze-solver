import { Direction } from '../../enums/Direction'
import { statisticsActionDispatcher } from '../../store/statistics/actions'
import { Coordinate } from '../../utils/Coordinate'
import { LogPart, Step } from '../model/Step'
import { StepStack } from '../model/StepStack'

export class DepthFirstSearchTerminalLogger {

    private readonly stack: StepStack

    constructor () {
        this.stack = new StepStack()
    }

    public addSearchStep (directions: Direction[], text: string): void {
        const logParts: LogPart[] = [
            this.createPart('SEARCH', 'red'),
            this.createPart('Found'),
            this.createPart(this.mapDirectionsToString(directions), 'blue')
        ]

        this.stack.addStep(new Step(logParts))
    }

    public addFoundNoUnvisited () {
        const logParts: LogPart[] = [
            this.createPart('SEARCH', 'red'),
            this.createPart('Found no unvisited directions')
        ]

        this.stack.addStep(new Step(logParts))
    }

    public addGenerationFinish () {
        const logParts: LogPart[] = [
            this.createPart('ALGORITHM', 'orange'),
            this.createPart('Finished maze generation')
        ]

        this.stack.addStep(new Step(logParts))
    }

    public addMoveStep (coord: Coordinate) {
        const logParts: LogPart[] = [
            this.createPart('MOVE', 'red'),
            this.createPart('Moving to coordinate'),
            this.createPart(`[x : ${coord.x}] [y : ${coord.y}]`, 'cyan')
        ]

        this.stack.addStep(new Step(logParts))
    }

    public addSetStep (coord: Coordinate, state: string) {
        const logParts: LogPart[] = [
            this.createPart('MOVE', 'red'),
            this.createPart('Setting coordinate '),
            this.createPart(`[x : ${coord.x}] [y : ${coord.y}]`, 'cyan'),
            this.createPart('to'),
            this.createPart(`${state}`, 'green')
        ]
        this.stack.addStep(new Step(logParts))
    }

    public commitStack () {
        statisticsActionDispatcher.addStepStack(this.stack)
    }

    private createPart (text: string, color?: string): LogPart {
        return {
            text,
            color: color ?? 'white'
        }
    }

    private mapDirectionsToString (directions: Direction[]): string {
        return directions.map((dir: Direction) => dir.direction).join(' ')
    }
}
