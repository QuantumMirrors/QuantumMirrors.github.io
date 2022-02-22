import p5 from "p5";
import { EndPoint } from "./models/end_block";
import { FullMirror } from "./models/full_mirror";
import { HalfMirror } from "./models/half_mirror";
import { Particle } from "./models/particle";
import { QuantumParticle } from "./models/quantum_particle";
import { StartPoint } from "./models/start_block";


export function quantum_sketch(p: p5, particleList: QuantumParticle[], endList: QuantumParticle[]) {
    if (particleList.length == 0) {
        particleList.push(new QuantumParticle(50, 650));
    }
    particleList.forEach((particle) => {
        particle.move();
        particle.draw(p);

        //1st half mirror
        if (particle.checkObstacle(350, 650)) {
            const newParticle = new QuantumParticle(350, 650);
            newParticle.setHorizontal(false);
            newParticle.setSuperposition();
            newParticle.setFlipped();

            particleList.push(newParticle);

            particle.setSuperposition();
        }

        //upper full mirror
        if (particle.checkObstacle(350, 350)) {
            particle.setFlipped();
            particle.setHorizontal(true);
        }

        //lower full mirror
        if (particle.checkObstacle(650, 650)) {
            particle.setFlipped();
            particle.setHorizontal(false);
        }

        //2nd half mirror
        if (particle.checkObstacle(650, 350)) {

            if (!particle.checkFlipped()) { //particle from left path
                const newParticle = new QuantumParticle(650, 350);
                newParticle.setHorizontal(false);
                newParticle.setSuperposition();

                particleList.push(newParticle);
            } else { //particle from lower path
                const newParticle = new QuantumParticle(650, 350);
                newParticle.setHorizontal(true);
                newParticle.setSuperposition();

                particleList.push(newParticle);
            }
        }

        //upper end
        if (particle.checkObstacle(650, 50)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }

        //right end
        if (particle.checkObstacle(950, 350)) {
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
        particleList.push(new Particle(50, 650));
    }
    particleList.forEach((particle) => {
        particle.move();
        particle.draw(p);

        //1st half mirror
        if (particle.checkObstacle(350, 650)) {
            particle.setHorizontal(p.random() < 0.5) //random choice if horizontal or vertical
        }

        //upper full mirror
        if (particle.checkObstacle(350, 350)) {
            particle.setHorizontal(true);

            particleList.push(new Particle(50, 650));
        }

        //lower full mirror
        if (particle.checkObstacle(650, 650)) {
            particle.setHorizontal(false);

            particleList.push(new Particle(50, 650));
        }

        //2nd half mirror
        if (particle.checkObstacle(650, 350)) {
            particle.setHorizontal(p.random() < 0.5) //random choice if horizontal or vertical
        }

        //upper end
        if (particle.checkObstacle(650, 50)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }

        //right end
        if (particle.checkObstacle(950, 350)) {
            let idx = particleList.indexOf(particle);
            particleList.splice(idx, 1);
            endList.push(particle);
        }
    })

    endList.forEach((particle) => {
        particle.draw(p);
    })
}