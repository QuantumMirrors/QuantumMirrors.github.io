import p5 from "p5";
import { EndPoint } from "./models/end";
import { FullMirror } from "./models/full_mirror";
import { HalfMirror } from "./models/half_mirror";
import { Particle } from "./models/particle";
import { QuantumParticle } from "./models/quantum_particle";
import { StartPoint } from "./models/start";


export function quantum_sketch(p: p5, particleList: QuantumParticle[], endList: QuantumParticle[]) {
    if (particleList.length == 0) {
        particleList.push(new QuantumParticle(50, 600));
    }
    particleList.forEach((particle) => {
        particle.move();
        particle.draw(p);

        //1st half mirror
        if (particle.checkObstacle(300, 600)) {
            const newParticle = new QuantumParticle(300, 600);
            newParticle.setHorizontal(false);
            newParticle.setSuperposition();
            newParticle.setFlipped();

            particleList.push(newParticle);

            particle.setSuperposition();
        }

        //upper full mirror
        if (particle.checkObstacle(300, 300)) {
            particle.setFlipped();
            particle.setHorizontal(true);
        }

        //lower full mirror
        if (particle.checkObstacle(600, 600)) {
            particle.setFlipped();
            particle.setHorizontal(false);
        }

        //2nd half mirror
        if (particle.checkObstacle(600, 300)) {

            if (!particle.checkFlipped()) { //particle from left path
                const newParticle = new QuantumParticle(600, 300);
                newParticle.setHorizontal(false);
                newParticle.setSuperposition();

                particleList.push(newParticle);
            } else { //particle from lower path
                const newParticle = new QuantumParticle(600, 300);
                newParticle.setHorizontal(true);
                newParticle.setSuperposition();

                particleList.push(newParticle);
            }
        }

        //upper end
        if (particle.checkObstacle(600, 50)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }

        //right end
        if (particle.checkObstacle(850, 300)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }
    })

    endList.forEach((particle) => {
        particle.draw(p);
    })
}

export function probability_sketch(p: p5, particleList: Particle[], endList: Particle[]) {
    if (particleList.length == 0) {
        particleList.push(new Particle(50, 600));
    }
    particleList.forEach((particle) => {
        particle.move();
        particle.draw(p);

        //1st half mirror
        if (particle.checkObstacle(300, 600)) {
            particle.setHorizontal(p.random() < 0.5) //random choice if horizontal or vertical
        }

        //upper full mirror
        if (particle.checkObstacle(300, 300)) {
            particle.setHorizontal(true);

            particleList.push(new Particle(50, 600));
        }

        //lower full mirror
        if (particle.checkObstacle(600, 600)) {
            particle.setHorizontal(false);

            particleList.push(new Particle(50, 600));
        }

        //2nd half mirror
        if (particle.checkObstacle(600, 300)) {
            particle.setHorizontal(p.random() < 0.5) //random choice if horizontal or vertical
        }

        //upper end
        if (particle.checkObstacle(600, 50)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }

        //right end
        if (particle.checkObstacle(850, 300)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }
    })

    endList.forEach((particle) => {
        particle.draw(p);
    })
}