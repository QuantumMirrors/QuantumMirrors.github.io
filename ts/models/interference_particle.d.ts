import p5 from "p5";
import { Direction } from "./game_object";
import { Particle } from "./particle";
export declare class InterferenceParticle extends Particle {
    private size;
    private phase_shifted;
    private superposition;
    private spin;
    private destructive;
    private maxSteps;
    private stepCounter;
    private x;
    private y;
    private direction;
    constructor(x: number, y: number, dir: Direction, destructive: boolean, phase: boolean);
    draw(p: p5): void;
    move(): void;
    setSuperposition(bool: boolean): void;
    setPhase(bool: boolean): void;
    getPhase(): boolean;
    shiftPhase(): void;
    checkOutOfBounds(p: p5): boolean;
    setDirection(dir: Direction): void;
    getDirection(): Direction;
    getXY(): [number, number];
    isNoDraw(): boolean;
}
