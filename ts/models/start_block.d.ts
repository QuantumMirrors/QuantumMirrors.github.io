import p5 from "p5";
import { Direction, GameObject } from "./game_object";
export declare class StartPoint extends GameObject {
    private hidden;
    addWithSuperposition: boolean;
    constructor(dir?: number[], hidden?: boolean, addWithSuperposition?: boolean);
    draw(p: p5): void;
    getDirections(): Direction[];
}
