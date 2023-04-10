import { Direction } from '../enums/Direction'
import { statisticsActionDispatcher } from '../store/statistics/actions'
import { Coordinate } from '../utils/Coordinate'
import { LogPart, Step } from './Step'
import { StepStack } from './StepStack'

export class BinaryTreeTerminalLogger {

    private readonly stack: StepStack

    constructor () {
        this.stack = new StepStack()
    }

    // public addSearchStep (directions: Direction[], text: string): void {
    //     const logParts: LogPart[] = [
    //         this.createPart('SEARCH', 'red'),
    //         this.createPart('Found'),
    //         this.createPart(this.mapDirectionsToString(directions), 'blue')
    //     ]

    //     this.stack.addStep(new Step(logParts))
    // }

    public movedToStep (coordinate: Coordinate) {
        const logParts: LogPart[] = [
            this.createPart('MOVE', 'red'),
            this.createPart('Moved to coordinates: '),
            this.createPart(`[${coordinate.x}, ${coordinate.y}]`, 'cyan')
        ]

        this.stack.addStep(new Step(logParts))
    }

    public removingWallStep (coordinate: Coordinate, direction: Direction) {
        const logParts: LogPart[] = [
            this.createPart('SET', 'red'),
            this.createPart('Removing wall to the: '),
            this.createPart(`[${direction.direction}]`, 'cyan')
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

    public addGenerationFinish () {
        const logParts: LogPart[] = [
            this.createPart('ALGORITHM', 'orange'),
            this.createPart('Finished maze generation')
        ]

        this.stack.addStep(new Step(logParts))
    }

}
