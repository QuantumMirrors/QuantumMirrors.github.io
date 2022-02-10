import p5 from "p5";
import { Mirror } from "./mirror";

export class HalfMirror extends Mirror {
    constructor(x: number, y: number){
        super(x, y, 0, 0, 255);
    }
}