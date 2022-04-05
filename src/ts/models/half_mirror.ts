import p5 from "p5";
import { Direction, getRotation } from "./game_object";
import { Mirror } from "./mirror";

export class HalfMirror extends Mirror {
  //for normal particle, that only gets sent in one direction
  private normalDir = {
    up: true,
    left: true,
    right: true,
    down: true,
  };

  constructor(dir = Direction.Right) {
    super(0, 0, 255, dir);
  }

  getDirections(entry_dir: Direction): Direction[] {
    if (this.direction == Direction.Right || this.direction == Direction.Left) {
      switch (entry_dir) {
        case Direction.Up:
          return [entry_dir, Direction.Right];
        case Direction.Left:
          return [entry_dir, Direction.Down];
        case Direction.Down:
          return [entry_dir, Direction.Left];
        case Direction.Right:
          return [entry_dir, Direction.Up];
      }
    } else {
      switch (entry_dir) {
        case Direction.Up:
          return [entry_dir, Direction.Left];
        case Direction.Left:
          return [entry_dir, Direction.Up];
        case Direction.Down:
          return [entry_dir, Direction.Right];
        case Direction.Right:
          return [entry_dir, Direction.Down];
      }
    }
  }

  getNormalDirection(entry_dir: Direction): Direction{
    if (this.direction == Direction.Right || this.direction == Direction.Left) {
      switch (entry_dir) {
        case Direction.Up:
          this.normalDir.up= !this.normalDir.up;
          return this.normalDir.up ? entry_dir : Direction.Right;
        case Direction.Left:
          this.normalDir.left = !this.normalDir.left;
          return this.normalDir.left ? entry_dir : Direction.Down;
        case Direction.Down:
          this.normalDir.down = !this.normalDir.down;
          return this.normalDir.down ? entry_dir : Direction.Left;
        case Direction.Right:
          this.normalDir.right = !this.normalDir.right;
          return this.normalDir.right ? entry_dir : Direction.Up;
      }
    } else {
      switch (entry_dir) {
        case Direction.Up:
          this.normalDir.up = !this.normalDir.up;
          return this.normalDir.up ? entry_dir : Direction.Left;
        case Direction.Left:
          this.normalDir.left = !this.normalDir.left;
          return this.normalDir.left ? entry_dir : Direction.Up;
        case Direction.Down:
          this.normalDir.down = !this.normalDir.down;
          return this.normalDir.down ? entry_dir : Direction.Right;
        case Direction.Right:
          this.normalDir.right = !this.normalDir.right;
          return this.normalDir.right ? entry_dir : Direction.Down;
      }
    }
  }

  //true if phase gets shifted, false if not
  checkPhaseShift(entry_dir: Direction) {
    if (this.direction == Direction.Right) {
      switch (entry_dir) {
        case Direction.Up:
          return true;
        case Direction.Left:
          return true;
        case Direction.Down:
          return false;
        case Direction.Right:
          return false;
      }
    }
    if (this.direction == Direction.Left) {
      switch (entry_dir) {
        case Direction.Up:
          return false;
        case Direction.Left:
          return false;
        case Direction.Down:
          return true;
        case Direction.Right:
          return true;
      }
    }
    if (this.direction == Direction.Down) {
      switch (entry_dir) {
        case Direction.Up:
          return true;
        case Direction.Left:
          return false;
        case Direction.Down:
          return false;
        case Direction.Right:
          return true;
      }
    }
    if (this.direction == Direction.Up) {
      switch (entry_dir) {
        case Direction.Up:
          return false;
        case Direction.Left:
          return true;
        case Direction.Down:
          return true;
        case Direction.Right:
          return false;
      }
    }
  }

  //override
  draw(p: p5) {
    p.push();

    p.rotate(getRotation(this.direction) - 45);
    p.stroke(255);
    p.fill(this.r, this.g, this.b);
    p.rect(0, 0, this.width * this.scale, this.height * this.scale);

    p.fill(255);
    p.rect(0, 3, this.width * this.scale, 3 * this.scale);

    p.pop();
  }
}
