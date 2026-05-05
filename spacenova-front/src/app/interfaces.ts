export interface IAsteroids {
    name: string,
    minDiameter: number,
    maxDiameter: number,
    hazardous: boolean,
    approachDate: Date | string,
    velocity: number,
    orbitingBody: string
}