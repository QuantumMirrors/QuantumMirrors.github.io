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
      [new StartPoint(), 1, 6],
      [new EndPoint(0, Direction.Up), 5, 3],
      [new EndPoint(), 8, 6],
      [new HalfMirror(Direction.Left), 5, 6],
    ],
  };
}
