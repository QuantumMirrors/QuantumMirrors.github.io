import p5 from "p5";
import { Direction } from "./game_object";
import { Particle } from "./particle";
export declare class NormalParticle extends Particle {
    private size;
    constructor(x: number, y: number, dir?: Direction);
    draw(p: p5): void;
    checkOutOfBounds(p: p5): boolean;
    setDirection(dir: Direction): void;
    getDirection(): Direction;
    getXY(): [number, number];
    isNoDraw(): boolean;
}
