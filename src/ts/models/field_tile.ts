import p5 from "p5";
import { GameObject } from "./game_object";

export class FieldTile {

    private gameObject: GameObject;
    
    constructor() {
        this.gameObject = new GameObject();
    }

    draw(p: p5, x_idx: number, y_idx: number) {
        p.push();

        const fieldSize = Math.floor(p.width / 10);
        const middle = Math.floor(fieldSize / 2);
        const x_translate = middle + x_idx * fieldSize;
        const y_translate = middle + y_idx * fieldSize;
        p.translate(x_translate, y_translate);

        p.stroke(255);
        p.line(-middle, -middle, -middle + middle/10, -middle + middle/10); //upper left corner
        p.line(middle, -middle, middle - middle/10, -middle + middle/10); //upper right corner
        p.line(-middle, middle, -middle + middle/10, middle - middle/10); //lower left corner
        p.line(middle, middle, middle - middle/10, middle - middle/10); //upper right corner

        this.gameObject.draw(p);
 
        p.pop();
    }
}