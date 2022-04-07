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
    quantum_particle: true,
    objects: [
      [new StartPoint(), 1, 5],
      [new EndPoint(50, Direction.Up), 5, 2],
      [new EndPoint(50), 8, 5],
      [new HalfMirror(Direction.Down), 5, 5],
    ],
  };
}
