import p5 from "p5";
import { FieldTile } from "./field_tile";

export class GameGrid {
    // 10 x 10 grid
    private grid: FieldTile[][];

    constructor() {
        this.grid = new Array(10).fill(new Array(10).fill(new FieldTile())); 
    }

    draw(p: p5) {
        p.push();

        this.checkMouseClicked(p);

        this.grid.forEach((row, y_idx) => row.forEach((field_tile, x_idx) => field_tile.draw(p, x_idx, y_idx)));

        p.pop();
    }

    private checkMouseClicked(p: p5) {
        if (p.mouseIsPressed) {
            console.log("pressed");
            const fieldSize = Math.floor(p.width / 10);
            const [x, y] = this.getIndex(p.mouseX, p.mouseY, fieldSize);
            
        } else {

        }
    }

    private getIndex(x_pos: number, y_pos: number, field_size: number): [number, number] {
        const x_idx  = Math.floor(x_pos / field_size);
        const y_idx  = Math.floor(y_pos / field_size);

        return [x_idx, y_idx];
    }
}