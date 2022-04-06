import p5 from "p5";
import { GameGrid } from "./game_grid";
export declare class GameObjectPopup {
    private dvi1;
    private div2;
    private div3;
    private x;
    private y;
    private shown;
    private grid;
    constructor(p: p5, gameGrid: GameGrid);
    hide(): void;
    show(x: number, y: number, mid_x: number, mid_y: number): void;
    windowResized(p: p5): void;
}
