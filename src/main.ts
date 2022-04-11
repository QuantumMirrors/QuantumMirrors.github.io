import p5 from "p5";
import { MirrorGame } from "./ts/spiegel-game";
import $ from "jquery";
import "./style/main.css";
import "./ts/tutorial-component";

if ($("#mirror-game").length) {
  const spiegeldemo = new MirrorGame();
  new p5(spiegeldemo.game());
}
