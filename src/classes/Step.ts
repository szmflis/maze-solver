export interface LogPart {
    text: string
    color: string
}

export class Step {
    private readonly logParts: LogPart[]

    constructor (parts: LogPart[]) {
        this.logParts = parts
    }

    getLogParts () {
        return this.logParts
    }
}
