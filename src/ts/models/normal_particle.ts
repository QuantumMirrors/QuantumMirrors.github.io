import p5 from "p5";
import { Direction } from "./game_object";
import { Particle } from "./particle";

export class NormalParticle extends Particle{
  private size = 30;

  constructor(x: number, y: number, dir: Direction = Direction.Right) {
    super();

    this.x = x;
    this.y = y;
    this.direction = dir;
  }

  draw(p: p5) {
    p.push();
    p.translate(this.x, this.y);

    p.noFill();
    p.strokeWeight(2);

    p.stroke(255, 255, 0);
    p.circle(0, 0, this.size * 2 * this.scale);

    p.pop();
  }

  //true if out of bounds, false if inside grid
  checkOutOfBounds(p: p5): boolean {
    return (
      this.x < -this.size ||
      this.x > p.width + this.size ||
      this.y < -this.size ||
      this.y > p.height + this.size
    );
  }

  setDirection(dir: Direction) {
    this.direction = dir;
  }

  getDirection(): Direction {
    return this.direction;
  }

  getXY(): [number, number] {
    return [Math.floor(this.x), Math.floor(this.y)];
  }

  isNoDraw(){
    return false;
  }
}
