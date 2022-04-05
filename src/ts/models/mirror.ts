import p5 from "p5";
import { Direction, GameObject, getRotation } from "./game_object";

export abstract class Mirror extends GameObject {
  protected width = 100;
  protected height = 10;

  protected r: number;
  protected g: number;
  protected b: number;

  constructor(r: number, g: number, b: number, dir = Direction.Right) {
    super(dir);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  draw(p: p5) {
    p.push();

    p.rotate(getRotation(this.direction) - 45);
    p.stroke(255);
    p.fill(this.r, this.g, this.b);
    p.rect(0, 0, this.width * this.scale, this.height * this.scale);

    p.pop();
  }

}
