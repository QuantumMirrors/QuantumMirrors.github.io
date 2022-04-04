import { Direction } from "./game_object";
import { Mirror } from "./mirror";
export declare class FullMirror extends Mirror {
    constructor(dir?: number[]);
    getDirections(entry_dir: Direction): Direction[];
}
