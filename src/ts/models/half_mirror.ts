import p5 from "p5";
import { Direction } from "./game_object";
import { Mirror } from "./mirror";

export class HalfMirror extends Mirror {
    constructor(dir = Direction.Right) {
        super(0, 0, 255, dir);
    }

    getDirections(entry_dir: Direction): Direction[] {
        if (this.direction == Direction.Right || this.direction == Direction.Left) {
            switch (entry_dir) {
                case Direction.Up: return [entry_dir, Direction.Right];
                case Direction.Left: return [entry_dir, Direction.Down];
                case Direction.Down: return [entry_dir, Direction.Left];
                case Direction.Right: return [entry_dir, Direction.Up];
            }
        } else {
            switch (entry_dir) {
                case Direction.Up: return [entry_dir, Direction.Left];
                case Direction.Left: return [entry_dir, Direction.Up];
                case Direction.Down: return [entry_dir, Direction.Right];
                case Direction.Right: return [entry_dir, Direction.Down];
            }
        }
    }
}