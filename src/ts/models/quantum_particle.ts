import p5 from "p5";
import { Particle } from "./particle";

export class QuantumParticle {
  private size = 30;
  private flipped = false;
  private superposition = false;
  private spin = 0;

  private horizontalMove = true;

  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(p: p5) {
    p.push();
    p.translate(this.x, this.y);

    p.noFill();
    p.strokeWeight(2);

    const x = this.size;
    const y = this.flipped ? this.size : -this.size;

    if (this.flipped) {
      p.stroke(0, 0, 255);
    } else {
      p.stroke(255, 0, 0);
    }

    p.bezier(-x, 0, 0, y * -2, 0, y * 2, x, 0);

    if (this.superposition) {
      this.spin += 360 / 60;
      p.stroke(255, 0, 0);
      p.arc(0, 0, this.size * 2, this.size * 2, 0 + this.spin, 90 + this.spin);
      p.arc(0, 0, x * 2, y * 2, 180 + this.spin, 270 + this.spin);
      p.stroke(0, 0, 255);
      p.arc(0, 0, x * 2, y * 2, 90 + this.spin, 180 + this.spin);
      p.arc(0, 0, x * 2, y * 2, 270 + this.spin, 0 + this.spin);
      if (this.spin >= 360) {
        this.spin = 0;
      }
    } else {
      p.stroke(255, 255, 0);
      p.circle(0, 0, this.size * 2);
    }

    p.pop();
  }

  move() {
    if (this.horizontalMove) {
      this.x++;
    } else {
      this.y--;
    }
  }

  checkObstacle(x: number, y: number): boolean {
    return this.x == x && this.y == y;
  }

  setHorizontal(bool: boolean) {
    this.horizontalMove = bool;
  }

  setSuperposition() {
    this.superposition = !this.superposition;
  }

  setFlipped() {
    this.flipped = !this.flipped;
  }

  checkFlipped(): boolean {
    return this.flipped;
  }
}
