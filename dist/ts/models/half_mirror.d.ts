import p5 from "p5";
import { Direction } from "./game_object";
import { Mirror } from "./mirror";
export declare class HalfMirror extends Mirror {
    constructor(dir?: number[]);
    getDirections(entry_dir: Direction): Direction[];
    checkPhaseShift(entry_dir: Direction): boolean;
    draw(p: p5): void;
}
