import p5 from "p5";
import { Direction, GameObject } from "./game_object";
export declare class FieldTile {
    private gameObject;
    private gridSize;
    private is_drag;
    constructor(gridSize: number);
    draw(p: p5, x_idx: number, y_idx: number): void;
    change_object(obj: GameObject): void;
    get_object(): GameObject;
    check_object(): boolean;
    rotate_object(): void;
    get_directions(entry_dir: Direction): Direction[];
    set_dragged(is_drag: boolean): void;
    static calc_middle_of_tile(p: p5, x_idx: number, y_idx: number, gridSize: number): [number, number, number];
}
