import p5 from "p5";
import { GameGrid } from "./game_grid";
export declare class GameObjectPopup {
    private dvi1;
    private div2;
    private div3;
    private x;
    private y;
    constructor(p: p5, gameGrid: GameGrid);
    hide(): void;
    show(x: number, y: number, field_size: number): void;
}
