import p5 from "p5";
import { EndPoint } from "./models/end_block";
import { FullMirror } from "./models/full_mirror";
import { GameGrid } from "./models/game_grid";
import { Direction } from "./models/game_object";
import { HalfMirror } from "./models/half_mirror";
import { Mirror } from "./models/mirror";
import { Particle } from "./models/particle";
import { QuantumParticle } from "./models/quantum_particle";
import { StartPoint } from "./models/start_block";
import { probability_sketch, quantum_sketch } from "./sketches";

export class SpiegelDemo {
    private sketch = (p: p5) => {
        const gameGrid = new GameGrid();
        gameGrid.add_game_object(new StartPoint(), 0, 6);
        gameGrid.add_game_object(new EndPoint(Direction.Up), 6, 0);
        gameGrid.add_game_object(new EndPoint(), 9, 3);
        gameGrid.add_game_object(new FullMirror(), 3, 3);
        gameGrid.add_game_object(new FullMirror(), 6, 6);
        gameGrid.add_game_object(new HalfMirror(), 3, 6);
        gameGrid.add_game_object(new HalfMirror(), 6, 3);

        let is_drag = false;
        p.mouseClicked = () => {
            if (is_drag) {
                gameGrid.grid_drag_end(p);
                is_drag = false;

            } else {
                gameGrid.grid_clicked(p);
            }
        }

        p.mouseDragged = () => {
            if (!is_drag) {
                is_drag = true;
                gameGrid.grid_drag_start(p);
            }
        }


        p.setup = () => {
            const canvas = p.createCanvas(1000, 1000);
            canvas.parent("spiegel-demo");
            p.angleMode(p.DEGREES);
            p.rectMode(p.CENTER);

            // p.noLoop();
        }

        p.draw = () => {
            p.clear(0, 0, 0, 0);
            p.background(64);

            gameGrid.draw(p);
        }
    }

    public game(): (p: p5) => void {
        return this.sketch;
    }
}