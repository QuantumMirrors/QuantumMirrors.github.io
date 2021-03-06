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
      [new StartPoint(Direction.Right, true, true), 2, 5],
      [new StartPoint(Direction.Up, true, true), 5, 8],
      [new HalfMirror(), 5, 5],
      [new EndPoint(0, Direction.Up), 5, 2],
      [new EndPoint(), 8, 5],
    ],
  };
}
