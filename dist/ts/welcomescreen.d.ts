export declare class WelcomeScreen {
    private overlay;
    constructor(skipTutorialCallback: () => void, startTutorialCallback: () => void);
    start(): void;
    remove(): void;
}
