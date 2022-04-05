import p5 from "p5";
import { Direction } from "./game_object";
import { Particle } from "./particle";
export declare class QuantumParticle extends Particle {
    private size;
    private phase_shifted;
    private superposition;
    private spin;
    private x;
    private y;
    private direction;
    private noDraw;
    constructor(x: number, y: number, dir?: Direction);
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
    dontDraw(): void;
    isNoDraw(): boolean;
}
