import p5 from "p5";
import { Direction } from "./game_object";
import { Particle } from "./particle";

export class QuantumParticle extends Particle {
  private size = 30;
  private phase_shifted = false;
  private superposition = false;
  private spin = 0;

  private noDraw = false;

  constructor(x: number, y: number, dir: Direction = Direction.Right) {
    super();

    this.x = x;
    this.y = y;
    this.direction = dir;
  }

  draw(p: p5) {
    if(this.noDraw){
      return;
    }

    p.push();
    p.translate(this.x, this.y);

    p.noFill();
    p.strokeWeight(2);

    const x = this.size * this.scale;
    const y = this.phase_shifted ? this.size * this.scale : -this.size * this.scale;

    if (this.phase_shifted) {
      p.stroke(0, 0, 255);
    } else {
      p.stroke(255, 0, 0);
    }

    const bezierY = y * 2 * (this.weight * 1.2);
    p.bezier(-x, 0, 0, -bezierY, 0, bezierY, x, 0);

    if (this.superposition) {
      this.spin += 360 / 60;
      p.stroke(255, 0, 0);
      p.arc(0, 0, this.size * 2 * this.scale, this.size * 2 * this.scale, 0 + this.spin, 90 + this.spin);
      p.arc(0, 0, x * 2, y * 2, 180 + this.spin, 270 + this.spin);
      p.stroke(0, 0, 255);
      p.arc(0, 0, x * 2, y * 2, 90 + this.spin, 180 + this.spin);
      p.arc(0, 0, x * 2, y * 2, 270 + this.spin, 0 + this.spin);
      if (this.spin >= 360) {
        this.spin = 0;
      }
    } else {
      p.stroke(255, 255, 0);
      p.circle(0, 0, this.size * 2 * this.scale);
    }

    p.pop();
  }

  setSuperposition(bool: boolean) {
    this.superposition = bool;
  }

  setPhase(bool: boolean) {
    this.phase_shifted = bool;
  }

  getPhase(): boolean {
    return this.phase_shifted;
  }

  shiftPhase() {
    this.phase_shifted = !this.phase_shifted;
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
    return [this.x, this.y];
  }

  dontDraw(){
    this.noDraw = true;
  }

  isNoDraw() {
    return this.noDraw;
  }
}
