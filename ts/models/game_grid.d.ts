import p5 from "p5";
import { Direction, GameObject } from "./game_object";
import { Particle, ParticleTypes } from "./particle";
export declare class GameGrid {
    private grid;
    gridSize: number;
    private multiStartpoint;
    private is_drag;
    private dragX;
    private dragY;
    private particles;
    private potentialInterferenceParticles;
    private endpoints;
    private endpointCounter;
    private endpointNum;
    private currentScale;
    private addParticleWithSuperposition;
    private maxNumParticles;
    constructor();
    draw(p: p5): void;
    addParticle(p: p5, particleType: ParticleTypes, interferenceParams?: {
        x: number;
        y: number;
        dir: Direction;
        destructive: boolean;
        phase: boolean;
        weight: number;
    }): void;
    removeParticle(particle: Particle): void;
    private drawParticles;
    private checkParticleCollision;
    checkNewInterference(p: p5): void;
    checkNextLevel(): boolean;
    grid_clicked(p: p5, trigger_popup: (x_idx: number, y_idx: number, mid_x: number, mid_y: number) => void): void;
    grid_drag_start(p: p5): void;
    grid_drag_end(p: p5): void;
    grid_drag_move(p: p5): void;
    private max_recursion;
    private beam_loop_start;
    private beam_loop;
    private draw_beam;
    private idxCalc;
    private idxCheck;
    private getIndex;
    private checkMousePosition;
    private checkPosition;
    add_game_object(obj: GameObject, x_idx: number, y_idx: number): void;
    setNewScale(scale: number): void;
    getScale(): number;
    clearGrid(): void;
    clearParticles(): void;
}
