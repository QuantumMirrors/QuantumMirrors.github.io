import p5 from "p5";
import { Direction } from "./game_object";
export declare class NewParticle {
    private size;
    private phase_shifted;
    private superposition;
    private spin;
    private x;
    private y;
    private direction;
    constructor(x: number, y: number, dir?: Direction);
    draw(p: p5): void;
    move(): void;
    setSuperposition(bool: boolean): void;
    setPhase(bool: boolean): void;
    getPhase(): boolean;
    shiftPhase(): void;
    checkFlipped(): boolean;
    checkOutOfBounds(p: p5): boolean;
    setDirection(dir: Direction): void;
    getDirection(): Direction;
    getXY(): [number, number];
}
