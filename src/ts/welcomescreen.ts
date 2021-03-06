import { WelcomeCard, welcome_update } from "./welcome-component";

export class WelcomeScreenOverlay {
  private overlay: WelcomeCard;

  constructor(
    skipTutorialCallback: () => void,
    startTutorialCallback: () => void
  ) {
    //initialize overlay
    this.overlay = document.createElement("welcome-overlay") as WelcomeCard;

    // window.onresize = () => this.updateOverlay();

    this.overlay.addEventListener(
      "custom-change",
      (event: Event & { detail: string }) => {
        if (event.detail === "startTutorial") {
          startTutorialCallback();
        } else if (event.detail === "skipTutorial") {
          skipTutorialCallback();
        }
      }
    );

    welcome_update(this.overlay, 0, 300, 500, 350);
  }

  start() {
    document.body.append(this.overlay);
  }

  remove() {
    this.overlay.remove();
  }

  //   updateOverlay() {
  //     const canvasPos = this.canvas.position() as { x: number; y: number };
  //     tut_update(
  //       this.overlay,
  //       canvasPos.x + x,
  //       canvasPos.y + y,
  //       canvasPos.x + this.currentTutorialStep.cardX,
  //       canvasPos.y + this.currentTutorialStep.cardY,
  //       this.currentTutorialStep.cardWidth,
  //       this.currentTutorialStep.cardHeight
  //     );

  //     tut_updateText(this.currentTutorialStep.html);
  //   }
}
