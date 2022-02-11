import p5 from "p5";
import { Direction } from "./game_object";
import { Mirror } from "./mirror";

export class FullMirror extends Mirror {
    constructor(dir = Direction.Right){
        super(255, 255, 255, dir);
    }

    getDirections(entry_dir: Direction): Direction[] {
        if (this.direction == Direction.Right || this.direction == Direction.Left) {
            switch (entry_dir) {
                case Direction.Up: return [Direction.Right];
                case Direction.Left: return [Direction.Down];
                case Direction.Down: return [Direction.Left];
                case Direction.Right: return [Direction.Up];
            }
        } else {
            switch (entry_dir) {
                case Direction.Up: return [Direction.Left];
                case Direction.Left: return [Direction.Up];
                case Direction.Down: return [Direction.Right];
                case Direction.Right: return [Direction.Down];
            }
        }
    }
}