import p5 from "p5";
import { Direction, GameObject } from "./game_object";
export declare class EndPoint extends GameObject {
    constructor(dir?: number[]);
    draw(p: p5): void;
    getDirections(): Direction[];
}
