import p5 from "p5";
import { Direction } from "./game_object";
import { Particle } from "./particle";

export class InterferenceParticle extends Particle {
  private size = 30;
  private phase_shifted = false;
  private superposition = true;
  private spin = 0;
  private destructive: boolean;

  private maxSteps = 200;
  private stepCounter = 0;

  constructor(
    x: number,
    y: number,
    dir: Direction = Direction.Right,
    destructive: boolean,
    phase: boolean
  ) {
    super();

    this.x = x;
    this.y = y;
    this.direction = dir;

    this.destructive = destructive;
    this.phase_shifted = phase;
  }

  draw(p: p5) {
    if (this.isNoDraw()) {
      return;
    }

    p.push();
    p.translate(this.x, this.y);

    p.noFill();
    p.strokeWeight(2);

    if (this.destructive) {
      const x = this.size * this.scale;
      const y = this.size * this.scale;
      const fadeScale =
        1.01 - this.stepCounter++ / (this.maxSteps * this.scale);
      const yScaled = y * 2.5 * fadeScale;

      p.stroke(0, 0, 255);
      p.bezier(-x, 0, 0, -yScaled, 0, yScaled, x, 0);

      p.stroke(255, 0, 0);
      p.bezier(-x, 0, 0, yScaled, 0, -yScaled, x, 0);

      //superposition ring
      this.spin += 360 / 60;
      p.stroke(255, 0, 0, 255 * fadeScale);
      p.arc(
        0,
        0,
        this.size * 2 * this.scale,
        this.size * 2 * this.scale,
        0 + this.spin,
        90 + this.spin
      );
      p.arc(0, 0, x * 2, y * 2, 180 + this.spin, 270 + this.spin);
      p.stroke(0, 0, 255, 255 * fadeScale);
      p.arc(0, 0, x * 2, y * 2, 90 + this.spin, 180 + this.spin);
      p.arc(0, 0, x * 2, y * 2, 270 + this.spin, 0 + this.spin);
      if (this.spin >= 360) {
        this.spin = 0;
      }
    } else {
      const x = this.size * this.scale;
      const y = this.phase_shifted
        ? this.size * this.scale
        : -this.size * this.scale;

      const fadeScale =
        this.stepCounter >= this.maxSteps * this.scale
          ? 1
          : this.stepCounter++ / (this.maxSteps * this.scale);

      if (this.phase_shifted) {
        p.stroke(0, 0, 255);
      } else {
        p.stroke(255, 0, 0);
      }

      p.bezier(-x, 0, 0, y * -2 * fadeScale, 0, y * 2 * fadeScale, x, 0);

      if (this.superposition) {
        const colorScale = 255 * fadeScale;

        this.spin += 360 / 60;
        p.stroke(255, colorScale, 0);
        p.arc(
          0,
          0,
          this.size * 2 * this.scale,
          this.size * 2 * this.scale,
          0 + this.spin,
          90 + this.spin
        );
        p.arc(0, 0, x * 2, y * 2, 180 + this.spin, 270 + this.spin);
        p.stroke(colorScale, colorScale, 255 - colorScale);
        p.arc(0, 0, x * 2, y * 2, 90 + this.spin, 180 + this.spin);
        p.arc(0, 0, x * 2, y * 2, 270 + this.spin, 0 + this.spin);
        if (this.spin >= 360) {
          this.spin = 0;
        }
      } else {
        p.stroke(255, 255, 0);
        p.circle(0, 0, this.size * 2 * this.scale);
      }
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

  isNoDraw() {
    return this.destructive && this.stepCounter >= this.maxSteps * this.scale;
  }
}
