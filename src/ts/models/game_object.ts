import p5 from "p5";

export const Direction = {
  //[x_direction, y_direction]
  Right: [1, 0],
  Down: [0, 1],
  Left: [-1, 0],
  Up: [0, -1],
};
export type Direction = typeof Direction[keyof typeof Direction];

export function getRotation(dir: Direction): number {
  switch (dir) {
    case Direction.Up:
      return 270;
    case Direction.Left:
      return 180;
    case Direction.Down:
      return 90;
    case Direction.Right:
      return 0;
  }
}

export abstract class GameObject {
  direction: Direction;
  constructor(dir: Direction) {
    this.direction = dir;
  }

  abstract draw(p: p5): void;
  abstract getDirections(entry_dir: Direction): Direction[];

  rotateRight() {
    switch (this.direction) {
      case Direction.Right:
        this.direction = Direction.Down;
        break;
      case Direction.Down:
        this.direction = Direction.Left;
        break;
      case Direction.Left:
        this.direction = Direction.Up;
        break;
      case Direction.Up:
        this.direction = Direction.Right;
        break;
    }
  }
}

export class BaseObject extends GameObject {
  constructor() {
    super(Direction.Right);
  }

  draw(p: p5) {
    p.push();

    p.circle(0, 0, 0.5);

    p.pop();
  }

  getDirections(): Direction[] {
    return [];
  }
}
