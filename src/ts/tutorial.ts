import { html, UpdateFunctionWithMethods } from "hybrids";
import p5 from "p5";
import { FieldTile } from "./models/field_tile";
import {
  TutorialOverlay,
  tut_activeButtons,
  tut_update,
  tut_updateText,
} from "./tutorial-component";

export class Tutorial {
  private canvas: p5.Element;
  private p: p5;
  private gridSize: number;

  private overlay: TutorialOverlay;

  private idxTutorialStep: number;
  private currentTutorialStep: TutorialStep;

  constructor(canvas: p5.Element, p: p5, gridSize: number) {
    this.canvas = canvas;
    this.p = p;
    this.gridSize = gridSize;
    this.idxTutorialStep = 0;
    this.currentTutorialStep = tutorial_steps[this.idxTutorialStep];

    //initialize overlay
    this.overlay = document.createElement(
      "tutorial-overlay"
    ) as TutorialOverlay;

    this.updateOverlay();
    this.updateActiveButtons();
    // document.body.append(this.overlay);

    window.onresize = () => this.updateOverlay();

    this.overlay.addEventListener(
      "custom-change",
      (event: Event & { detail: string }) => {
        if (event.detail === "next") {
          this.nextTutorialStep();
        } else if (event.detail === "previous") {
          this.previousTutorialStep();
        }
      }
    );
  }

  start() {
    document.body.append(this.overlay);
  }

  remove() {
    this.overlay.remove();
  }

  updateOverlay() {
    const [x, y, middle] = FieldTile.calc_middle_of_tile(
      this.p,
      this.currentTutorialStep.objectX,
      this.currentTutorialStep.objectY,
      this.gridSize
    );
    const canvasPos = this.canvas.position() as { x: number; y: number };
    const canvasSize = this.canvas.size() as { width: number; height: number };
    const circleSize =
      canvasSize.width /
      1.6 /
      (this.currentTutorialStep.circleScale ?? this.gridSize);

    tut_update(
      this.overlay,
      canvasPos.x + x,
      canvasPos.y + y,
      circleSize,
      canvasPos.x + this.currentTutorialStep.cardX,
      canvasPos.y + this.currentTutorialStep.cardY,
      this.currentTutorialStep.cardWidth,
      this.currentTutorialStep.cardHeight
    );
    tut_updateText(this.currentTutorialStep.html);
  }

  private nextTutorialStep() {
    this.currentTutorialStep = tutorial_steps[++this.idxTutorialStep];
    this.updateOverlay();
    this.updateActiveButtons();
  }
  private previousTutorialStep() {
    this.currentTutorialStep = tutorial_steps[--this.idxTutorialStep];
    this.updateOverlay();
    this.updateActiveButtons();
  }
  private updateActiveButtons() {
    tut_activeButtons(
      this.overlay,
      !(this.idxTutorialStep >= tutorial_steps.length - 1),
      !(this.idxTutorialStep <= 0)
    );
  }
}

interface TutorialStep {
  objectX: number;
  objectY: number;
  circleScale?: number;
  cardX: number;
  cardY: number;
  cardWidth: number;
  cardHeight: number;
  html: UpdateFunctionWithMethods<unknown>;
}

const tutorial_steps: TutorialStep[] = [
  {
    objectX: -5,
    objectY: 6,
    cardX: 200,
    cardY: 100,
    cardWidth: 300,
    cardHeight: 200,
    html: html`
      <h3>Welcome to the tutorial</h3>
      <p>
        In this tutorial I will guide you through the first steps in this game
        and provide some explanations on what is even going on with these funky
        quantum particles.
      </p>
    `,
  },
  {
    objectX: 4.75,
    objectY: 5,
    circleScale: 1.5,
    cardX: 100,
    cardY: 150,
    cardWidth: 250,
    cardHeight: 300,
    html: html`
      <h3>The Basis</h3>
      <p>
        This game is based on a famous physics experiment, that you may or may
        not know from school. It uses different mirrors to reflect and redirect
        light from a laser.
      </p>
      <p>"insert picture"</p>
    `,
  },
  {
    objectX: 4.75,
    objectY: 5,
    circleScale: 1.5,
    cardX: 100,
    cardY: 150,
    cardWidth: 250,
    cardHeight: 200,
    html: html`
      <h3>The Objects</h3>
      <p>
        To play this game, there are multiple objects that you can place and
        move around on the playing field.
      </p>
    `,
  },
  {
    objectX: 1,
    objectY: 6,
    cardX: 100,
    cardY: 350,
    cardWidth: 250,
    cardHeight: 200,
    html: html`
      <h3>The Startpoint</h3>
      <p>
        This is the Startpoint. This is where the particles and a guiding beam
        emit from and travel across the playing field.
      </p>
    `,
  },
  {
    objectX: 8,
    objectY: 3,
    cardX: 700,
    cardY: 50,
    cardWidth: 250,
    cardHeight: 200,
    html: html`
      <h3>The Endpoint</h3>
      <p>
        This is the Endpoint. This is the object where you will try guide the
        particles to from the startpoint.
      </p>
    `,
  },
  {
    objectX: 4,
    objectY: 3,
    cardX: 100,
    cardY: 50,
    cardWidth: 300,
    cardHeight: 250,
    html: html`
      <h3>The Mirror</h3>
      <p>
        This is one of the Mirrors. This Mirror can fully redirect the incoming
        particles.
      </p>
      <p>
        You will use these Mirrors to guide the particles form the startpoint to
        the endpoints.
      </p>
    `,
  },
  {
    objectX: 4,
    objectY: 6,
    cardX: 100,
    cardY: 150,
    cardWidth: 300,
    cardHeight: 400,
    html: html`
      <h3>The Halfmirror</h3>
      <p>
        This is the Halfmirror. This Mirror is very special and is the main
        culprit responsible for causing all the funky quantum effects. (we will
        look at those later)
      </p>
      <p>
        The incoming particles that reach this mirror will be split up and
        travel in two directions.
      </p>
    `,
  },
];
