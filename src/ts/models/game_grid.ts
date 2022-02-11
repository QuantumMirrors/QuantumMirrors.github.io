import p5 from "p5";
import { FieldTile } from "./field_tile";
import { BaseObject, Direction, GameObject } from "./game_object";
import { HalfMirror } from "./half_mirror";
import { StartPoint } from "./start";

export class GameGrid {
    // 10 x 10 grid
    private grid: FieldTile[][];
    private gridSize = 10;


    //noch ändern mit dem startpoint
    private start: StartPoint;
    private startX: number;
    private startY: number;

    //maybe anders
    private is_drag = false;
    private dragX: number;
    private dragY: number;

    constructor() {
        //initialize grid
        this.grid = [];
        for (let index = 0; index < this.gridSize; index++) {
            let temp_row: FieldTile[] = [];
            for (let j = 0; j < this.gridSize; j++) {
                temp_row.push(new FieldTile(this.gridSize));
            }
            this.grid.push(temp_row);
        }
    }


    draw(p: p5) {
        p.push();

        //draw laser beam
        if (this.start) {
            this.beam_loop_start(p);
        }

        //draw fields with objects
        this.grid.forEach((row, y_idx) => row.forEach((field_tile, x_idx) => field_tile.draw(p, x_idx, y_idx)));

        p.pop();
    }

    grid_clicked(p: p5) {
        if (!this.checkMousePosition(p)) {
            return;
        }

        const [x, y] = this.getIndex(p);

        this.grid[y][x].rotate_object();
    }

    grid_drag_start(p: p5) {
        if (!this.checkMousePosition(p)) {
            return;
        }

        [this.dragX, this.dragY] = this.getIndex(p);
        
        this.is_drag = true;
        this.grid[this.dragY][this.dragX].set_dragged(true);
    }

    grid_drag_end(p: p5){
        if (!this.checkMousePosition(p)) {
            this.grid[this.dragY][this.dragX].set_dragged(false);
            return;
        }

        const [end_x, end_y] = this.getIndex(p);

        //swap dragged object with target object
        let tmp = this.grid[this.dragY][this.dragX].get_object();
        this.grid[this.dragY][this.dragX].change_object(this.grid[end_y][end_x].get_object());
        this.grid[end_y][end_x].change_object(tmp);

        if (tmp instanceof StartPoint) {
            this.startX = end_x;
            this.startY = end_y;
        }

        this.is_drag = false;
        this.grid[this.dragY][this.dragX].set_dragged(false);
    }

    add_game_object(obj: GameObject, x_idx: number, y_idx: number) {
        this.grid[y_idx][x_idx].change_object(obj);
        if (obj instanceof StartPoint) {
            this.start = obj;
            this.startX = x_idx;
            this.startY = y_idx;
        }
    }

    private beam_loop_start(p: p5){
        if(this.is_drag){
            this.beam_loop(this.getIndex(p), this.start.getDirections().pop(), p);
        } else {
            this.beam_loop([this.startX, this.startY], this.start.getDirections().pop(), p);
        }
    }

    private beam_loop(startpoint: number[], dir: Direction, p: p5) {
        let idx_arr = [...startpoint];
        for (let i = 0; i < this.gridSize; i++) {
            idx_arr = this.idxCalc(idx_arr, dir)
            if (this.idxCheck(idx_arr)) {
                this.draw_beam(startpoint[0], startpoint[1], idx_arr[0], idx_arr[1], p);
                break;
            }
            if (this.grid[idx_arr[1]][idx_arr[0]].check_object()) {
                this.draw_beam(startpoint[0], startpoint[1], idx_arr[0], idx_arr[1], p);

                //get new directions from next object and repeat beam_loop
                let new_dirs = this.grid[idx_arr[1]][idx_arr[0]].get_directions(dir);
                new_dirs.forEach((dir) => this.beam_loop([...idx_arr], dir, p));

                break;
            }
        }
    }

    private draw_beam(startX: number, startY: number, endX: number, endY: number, p: p5) {
        p.push();

        const fieldSize = Math.floor(p.width / this.gridSize);
        const middle = Math.floor(fieldSize / 2);
        const x_start = middle + startX * fieldSize;
        const y_start = middle + startY * fieldSize;
        const x_end = middle + endX * fieldSize;
        const y_end = middle + endY * fieldSize;

        p.stroke(255, 0, 0);
        p.line(x_start, y_start, x_end, y_end);

        p.pop();
    }

    //adds the direction to the index_array
    private idxCalc = (arr: number[], dir: Direction) => arr.map((num, idx) => num + dir[idx]);
    //checks if the index_array has indexes that are out of bounds
    private idxCheck = (arr: number[]) => {
        return arr.map((num) => num < 0 || num >= this.gridSize)
            .reduce((prev, cur) => prev || cur);
    }

    private getIndex(p: p5): [number, number] {
        const field_size = Math.floor(p.width / this.gridSize);
        const x_idx = Math.floor(p.mouseX / field_size);
        const y_idx = Math.floor(p.mouseY / field_size);

        return [x_idx, y_idx];
    }

    private checkMousePosition(p: p5): boolean {
        return !(p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height);
    }
}