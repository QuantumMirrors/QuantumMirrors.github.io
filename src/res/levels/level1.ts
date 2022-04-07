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
      [new StartPoint(), 0, 6],
      [new EndPoint(0, Direction.Up), 6, 0],
      [new EndPoint(), 9, 3],
      [new FullMirror(), 3, 3],
      [new FullMirror(), 6, 6],
      [new HalfMirror(), 3, 6],
      [new HalfMirror(), 6, 3],
    ],
  };
}
