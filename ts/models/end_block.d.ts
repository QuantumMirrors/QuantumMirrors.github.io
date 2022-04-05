import p5 from "p5";
import { Direction, GameObject } from "./game_object";
export declare class EndPoint extends GameObject {
    private counter;
    private index;
    private percentage;
    constructor(dir?: number[]);
    draw(p: p5): void;
    setCounter(counter: {
        [index: number]: number;
    }, index: number): void;
    addToCounter(): void;
    private calcNewPercentage;
    getDirections(): Direction[];
}
