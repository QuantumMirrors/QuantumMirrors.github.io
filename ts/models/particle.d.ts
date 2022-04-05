import p5 from "p5";
import { Direction } from "./game_object";
export declare enum ParticleTypes {
    Quantum = 0,
    Normal = 1,
    Interference = 2
}
export declare abstract class Particle {
    abstract draw(p: p5): void;
    abstract move(): void;
    abstract checkOutOfBounds(p: p5): boolean;
    abstract setDirection(dir: Direction): void;
    abstract getDirection(): Direction;
    abstract getXY(): [number, number];
    abstract isNoDraw(): boolean;
}
