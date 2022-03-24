import { EndPoint } from "../../ts/models/end_block";
import { FullMirror } from "../../ts/models/full_mirror";
import { Direction, GameObject } from "../../ts/models/game_object";
import { HalfMirror } from "../../ts/models/half_mirror";
import { StartPoint } from "../../ts/models/start_block";

export default function levels(): [GameObject, number, number][] {
  return [
    [new StartPoint(), 1, 6],
    [new EndPoint(), 8, 3],
    [new EndPoint(), 8, 6],
    [new FullMirror(), 4, 3],
    [new HalfMirror(), 4, 6],
  ];
}
