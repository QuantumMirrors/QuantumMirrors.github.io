import p5 from "p5";
import { GameObject } from "./game_object";
export declare abstract class Mirror extends GameObject {
    protected width: number;
    protected height: number;
    protected r: number;
    protected g: number;
    protected b: number;
    constructor(r: number, g: number, b: number, dir?: number[]);
    draw(p: p5): void;
}
