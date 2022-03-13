import { EndPoint } from "../../ts/models/end_block";
import { FullMirror } from "../../ts/models/full_mirror";
import { Direction, GameObject } from "../../ts/models/game_object";
import { HalfMirror } from "../../ts/models/half_mirror";
import { StartPoint } from "../../ts/models/start_block";

export default function levels(): [GameObject, number, number][] {
  return [
    [new StartPoint(), 0, 6],
    [new EndPoint(Direction.Up), 6, 0],
    [new FullMirror(), 6, 6],
  ];
}
