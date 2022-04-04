import p5 from "p5";
export declare const Direction: {
    Right: number[];
    Down: number[];
    Left: number[];
    Up: number[];
};
export declare type Direction = typeof Direction[keyof typeof Direction];
export declare function getRotation(dir: Direction): number;
export declare abstract class GameObject {
    direction: Direction;
    constructor(dir: Direction);
    abstract draw(p: p5): void;
    abstract getDirections(entry_dir: Direction): Direction[];
    rotateRight(): void;
}
export declare class BaseObject extends GameObject {
    constructor();
    draw(p: p5): void;
    getDirections(): Direction[];
}
