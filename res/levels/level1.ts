import { EndPoint } from "../../ts/models/end_block";
import { FullMirror } from "../../ts/models/full_mirror";
import { Direction, GameObject } from "../../ts/models/game_object";
import { HalfMirror } from "../../ts/models/half_mirror";
import { StartPoint } from "../../ts/models/start_block";

export default function levels(): {
  quantum_particle: boolean;
  objects: [GameObject, number, number][];
} {
  return {
    quantum_particle: false,
    objects: [
      [new StartPoint(), 2, 6],
      [new EndPoint(100, Direction.Up), 6, 1],
      [new FullMirror(Direction.Down), 6, 6],
    ],
  };
}
