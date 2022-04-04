/// <reference types="hybrids" />
export interface TutorialOverlay extends HTMLElement {
    circleX: number;
    circleY: number;
    cirecleSize: number;
    cardX: number;
    cardY: number;
    cardWidth: number;
    cardHeight: number;
    triggerUpdate: boolean;
    activePrevious: boolean;
    activeNext: boolean;
}
export declare function tut_update(host: any, circleX: number, circleY: number, cirecleSize: number, cardX: number, cardY: number, cardWidth: number, cardHeight: number): void;
export declare function tut_updateText(htmlText: any): void;
export declare function tut_activeButtons(host: any, next: boolean, previous: boolean): void;
declare const _default: import("hybrids").Component<TutorialOverlay>;
export default _default;
