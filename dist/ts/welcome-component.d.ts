/// <reference types="hybrids" />
export interface WelcomeOverlay extends HTMLElement {
    cardX: number;
    cardY: number;
    cardWidth: number;
    cardHeight: number;
    triggerUpdate: boolean;
}
export declare function welcome_update(host: any, cardX: number, cardY: number, cardWidth: number, cardHeight: number): void;
declare const _default: import("hybrids").Component<WelcomeOverlay>;
export default _default;
