import p5 from "p5";
import { Mirror } from "./mirror";

export class FullMirror extends Mirror {
    constructor(x: number, y: number){
        super(x, y, 255, 255, 255);
    }
}