import p5 from "p5";
export declare class TutorialOverlay {
    private canvas;
    private p;
    private gridSize;
    private overlay;
    private idxTutorialStep;
    private currentTutorialStep;
    private loadLevelCallback;
    constructor(canvas: p5.Element, p: p5, gridSize: number, loadLevelCallBack: (level: string) => Promise<void>, endTutorialCallback: () => void, endCallback: () => void);
    start(): void;
    remove(): void;
    updateOverlay(): void;
    private nextTutorialStep;
    private previousTutorialStep;
    private updateActiveButtons;
}
