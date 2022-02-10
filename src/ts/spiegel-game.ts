import p5 from "p5";
import { EndPoint } from "./models/end";
import { FullMirror } from "./models/full_mirror";
import { GameGrid } from "./models/game_grid";
import { HalfMirror } from "./models/half_mirror";
import { Mirror } from "./models/mirror";
import { Particle } from "./models/particle";
import { QuantumParticle } from "./models/quantum_particle";
import { StartPoint } from "./models/start";
import { probability_sketch, quantum_sketch } from "./sketches";

export class SpiegelDemo {
    private sketch = (p: p5) => {
        const mirror1 = new HalfMirror(300, 600);
        const mirror2 = new HalfMirror(600, 300);
        const mirror3 = new FullMirror(300, 300);
        const mirror4 = new FullMirror(600, 600);
        const start = new StartPoint(50, 600);
        const end1 = new EndPoint(600, 50);
        const end2 = new EndPoint(850, 300);

        const particleList: QuantumParticle[] = [];
        const endList: QuantumParticle[] = [];

        // const particleList: Particle[] = [];
        // const endList: Particle[] = [];


        const gameGrid = new GameGrid();

        p.setup = () => {
            const canvas = p.createCanvas(1000, 1000);
            canvas.parent("spiegel-demo");
            p.background(0);
            p.angleMode(p.DEGREES);
            p.rectMode(p.CENTER);
        }

        p.draw = () => {
            p.clear(0, 0, 0, 0);
            p.background(0);

            p.push();
            p.stroke(255);
            p.line(50, 600, 600, 600);
            p.line(300, 600, 300, 300);
            p.line(300, 300, 850, 300);
            p.line(600, 600, 600, 50);
            p.pop();

            mirror1.draw(p);
            mirror2.draw(p);
            mirror3.draw(p);
            mirror4.draw(p);
            start.draw(p);
            end1.draw(p);
            end2.draw(p);

            quantum_sketch(p, particleList, endList);

            // probability_sketch(p, particleList, endList);


            gameGrid.draw(p);
        }
    }

    public game(): (p: p5) => void {
        return this.sketch;
    }
}