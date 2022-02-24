import p5 from "p5";
import { SpiegelDemo } from "./ts/spiegel-game";
import $ from "jquery";

if ($('#mirror-game').length) {
    const spiegeldemo = new SpiegelDemo()
    new p5(spiegeldemo.game())
}