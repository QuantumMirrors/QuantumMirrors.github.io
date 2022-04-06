import p5 from "p5";
import { EndPoint } from "./end_block";
import { FieldTile } from "./field_tile";
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

  private shown = false;
  private grid: GameGrid;

  constructor(p: p5, gameGrid: GameGrid) {
    this.grid = gameGrid;

    this.dvi1 = p.createDiv();
    this.dvi1.parent("game-object-popup");
    this.dvi1.position(-500, -500);
    // this.dvi1.size(100, 100);

    this.div2 = p.createDiv();
    this.div2.parent(this.dvi1);
    // this.div2.size(100, 100);

    this.div3 = p.createDiv();
    this.div3.parent(this.div2);
    // this.div3.size(90, 90);
    this.div3.center();
    this.div3.addClass("popup-btn");

    this.dvi1.addClass("popup-size");
    this.div2.addClass("popup-size");
    this.div3.addClass("popup-size");

    const button1 = p.createButton("FM");
    button1.mouseClicked(() => {
      gameGrid.add_game_object(new FullMirror(), this.x, this.y);
      this.hide();
    });
    button1.style("width", "50%");
    button1.style("height", "50%");
    button1.parent(this.div3);

    const button2 = p.createButton("HM");
    button2.mouseClicked(() => {
      gameGrid.add_game_object(new HalfMirror(), this.x, this.y);
      this.hide();
    });
    button2.style("width", "50%");
    button2.style("height", "50%");
    button2.parent(this.div3);

    const button3 = p.createButton("SP");
    button3.mouseClicked(() => {
      gameGrid.add_game_object(new StartPoint(), this.x, this.y);
      this.hide();
    });
    button3.style("width", "50%");
    button3.style("height", "50%");
    button3.parent(this.div3);

    const button4 = p.createButton("EP");
    button4.mouseClicked(() => {
      gameGrid.add_game_object(new EndPoint(), this.x, this.y);
      this.hide();
    });
    button4.style("width", "50%");
    button4.style("height", "50%");
    button4.parent(this.div3);

    this.hide();
  }

  hide() {
    // this.div3.hide();
    this.dvi1.position(-500, -500);
    this.shown = false;
  }

  show(x: number, y: number, mid_x: number, mid_y: number) {
    this.x = x;
    this.y = y;

    const { width, height } = this.dvi1.size() as {
      width: number;
      height: number;
    };
    this.dvi1.position(mid_x - width / 2, mid_y - height / 2);
    console.log(this.dvi1.position());

    this.shown = true;
  }

  windowResized(p: p5) {
    if (this.shown) {
      const [mid_x, mid_y, middle] = FieldTile.calc_middle_of_tile(
        p,
        this.x,
        this.y,
        this.grid.gridSize
      );

      this.show(this.x, this.y, mid_x, mid_y);
    }
  }
}
