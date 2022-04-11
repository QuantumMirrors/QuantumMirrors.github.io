export declare class WelcomeScreenOverlay {
    private overlay;
    constructor(skipTutorialCallback: () => void, startTutorialCallback: () => void);
    start(): void;
    remove(): void;
}
