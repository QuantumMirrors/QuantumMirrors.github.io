import p5 from "p5";
import { EndPoint } from "./end_block";
import { FullMirror } from "./full_mirror";
import { GameGrid } from "./game_grid";
import { GameObject } from "./game_object";
import { HalfMirror } from "./half_mirror";
import { StartPoint } from "./start_block";

export class GameObjectPopup {
    private dvi1: p5.Element;
    private div2: p5.Element;
    private div3: p5.Element;

    private x: number;
    private y: number;

    constructor(p: p5, gameGrid: GameGrid) {
        this.dvi1 = p.createDiv();
        this.dvi1.parent("game-object-popup");
        this.dvi1.position(-100, -100);
        this.dvi1.size(100, 100);
        // div.style("background-color", "blue");
        this.div2 = p.createDiv();
        this.div2.parent(this.dvi1);
        this.div2.size(100, 100);
        // div2.style("background-color", "white");
        this.div3 = p.createDiv();
        this.div3.parent(this.div2);
        this.div3.size(90, 90);
        this.div3.center();
        // this.div3.style("background-color", "black");
        
        const button1 = p.createButton("FM");
        button1.mousePressed(() => {
            gameGrid.add_game_object(new FullMirror(), this.x, this.y);
            this.hide();
        });
        button1.style("width", "50%");
        button1.style("height", "50%");
        button1.parent(this.div3);

        const button2 = p.createButton("HM");
        button2.mousePressed(() => {
            gameGrid.add_game_object(new HalfMirror(), this.x, this.y);
            this.hide();
        });
        button2.style("width", "50%");
        button2.style("height", "50%");
        button2.parent(this.div3);

        const button3 = p.createButton("SP");
        button3.mousePressed(() => {
            gameGrid.add_game_object(new StartPoint(), this.x, this.y);
            this.hide();
        });
        button3.style("width", "50%");
        button3.style("height", "50%");
        button3.parent(this.div3);

        const button4 = p.createButton("EP");
        button4.mousePressed(() => {
            gameGrid.add_game_object(new EndPoint(), this.x, this.y);
            this.hide();
        });
        button4.style("width", "50%");
        button4.style("height", "50%");
        button4.parent(this.div3);

        this.hide();
    }

    hide() {
        this.div3.hide();
    }

    show(x: number, y: number, field_size: number) {
        this.x = x;
        this.y = y;

        this.dvi1.position(x*field_size, y* field_size);
        this.dvi1.size(field_size, field_size);
        this.div2.size(field_size, field_size);
        this.div3.size(field_size * 0.9, field_size * 0.9);

        this.div3.show();
    }
}