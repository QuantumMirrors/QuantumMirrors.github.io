import p5 from "p5";
import { BaseObject, Direction, GameObject } from "./game_object";

export class FieldTile {

    private gameObject: GameObject;
    private gridSize: number;

    private is_drag = false;

    constructor(gridSize: number) {
        this.gameObject = new BaseObject();
        this.gridSize = gridSize;
    }

    draw(p: p5, x_idx: number, y_idx: number) {
        p.push();

        //translate to middle of the field
        const [x_translate, y_translate, middle] = FieldTile.calc_middle_of_tile(p, x_idx, y_idx, this.gridSize);
        p.translate(x_translate, y_translate);

        // p.stroke(60);
        // p.noFill();
        // p.rect(0, 0, fieldSize, fieldSize);
        //draw "X"-lines
        p.stroke(255);
        p.line(-middle, -middle, -middle + middle/10, -middle + middle/10); //upper left corner
        p.line(middle, -middle, middle - middle/10, -middle + middle/10); //upper right corner
        p.line(-middle, middle, -middle + middle/10, middle - middle/10); //lower left corner
        p.line(middle, middle, middle - middle/10, middle - middle/10); //upper right corner

        //draw object
        if(this.is_drag){
            p.translate(p.mouseX - x_translate, p.mouseY - y_translate);
        }
        this.gameObject.draw(p);
 
        p.pop();
    }

    change_object(obj: GameObject){
        this.gameObject = obj;
    }

    get_object(){
        return this.gameObject;
    }

    check_object(): boolean{
        return !(this.gameObject instanceof BaseObject);
    }

    rotate_object() {
        this.gameObject.rotateRight();
    }

    get_directions(entry_dir: Direction): Direction[]{
        return this.gameObject.getDirections(entry_dir);
    }

    set_dragged(is_drag: boolean) {
        this.is_drag = is_drag;
    }

    static calc_middle_of_tile(p: p5, x_idx: number, y_idx: number, gridSize: number): [number, number, number]{
        const fieldSize = Math.floor(p.width / gridSize);
        const middle = Math.floor(fieldSize / 2);
        const x_translate = middle + x_idx * fieldSize;
        const y_translate = middle + y_idx * fieldSize;
        return [x_translate, y_translate, middle];
    }
}