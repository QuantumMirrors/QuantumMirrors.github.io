import p5 from "p5";
import { Direction } from "./game_object";

export enum ParticleTypes {
  Quantum,
  Normal,
  Interference,
}

export abstract class Particle {
  abstract draw(p: p5): void;
  abstract move(): void;
  abstract checkOutOfBounds(p: p5): boolean;
  abstract setDirection(dir: Direction): void;
  abstract getDirection(): Direction;
  abstract getXY(): [number, number];
  abstract isNoDraw(): boolean;
}
