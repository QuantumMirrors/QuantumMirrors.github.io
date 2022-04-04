import p5 from "p5";
export declare class Tutorial {
    private canvas;
    private p;
    private gridSize;
    private overlay;
    private idxTutorialStep;
    private currentTutorialStep;
    constructor(canvas: p5.Element, p: p5, gridSize: number);
    start(): void;
    remove(): void;
    updateOverlay(): void;
    private nextTutorialStep;
    private previousTutorialStep;
    private updateActiveButtons;
}
