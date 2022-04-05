import p5 from "p5";
import { Direction } from "./game_object";

export enum ParticleTypes {
  Quantum,
  Normal,
  Interference,
}

export abstract class Particle {
  abstract draw(p: p5): void;
  abstract checkOutOfBounds(p: p5): boolean;
  abstract setDirection(dir: Direction): void;
  abstract getDirection(): Direction;
  abstract getXY(): [number, number];
  abstract isNoDraw(): boolean;

  protected scale = 1;
  setScale(scale: number) {
    this.scale = scale;
  }

  protected x: number;
  protected y: number;
  protected direction: Direction;
  //TODO: try to scale the speed/move better
  move() {
    // switch (this.direction) {
    //   case Direction.Up:
    //     this.y -= this.scale;
    //     break;
    //   case Direction.Left:
    //     this.x -= this.scale;
    //     break;
    //   case Direction.Down:
    //     this.y += this.scale;
    //     break;
    //   case Direction.Right:
    //     this.x += this.scale;
    //     break;
    // }
    switch (this.direction) {
      case Direction.Up:
        this.y--;
        break;
      case Direction.Left:
        this.x--;
        break;
      case Direction.Down:
        this.y++;
        break;
      case Direction.Right:
        this.x++;
        break;
    }
  }
}
