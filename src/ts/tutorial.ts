import { html, UpdateFunctionWithMethods } from "hybrids";
import p5 from "p5";
import { FieldTile } from "./models/field_tile";
import {
  TutorialCard,
  tut_activeButtons,
  tut_update,
  tut_updateText,
} from "./tutorial-component";

export class TutorialOverlay {
  private canvas: p5.Element;
  private p: p5;
  private gridSize: number;

  private overlay: TutorialCard;

  private idxTutorialStep: number;
  private currentTutorialStep: TutorialStep;

  private loadLevelCallback: (level: string) => Promise<void>;

  constructor(
    canvas: p5.Element,
    p: p5,
    gridSize: number,
    loadLevelCallBack: (level: string) => Promise<void>,
    endTutorialCallback: () => void,
    endCallback: () => void
  ) {
    this.canvas = canvas;
    this.p = p;
    this.gridSize = gridSize;
    this.idxTutorialStep = 0;
    this.currentTutorialStep = tutorial_steps[this.idxTutorialStep];

    this.loadLevelCallback = loadLevelCallBack;

    //initialize overlay
    this.overlay = document.createElement(
      "tutorial-overlay"
    ) as TutorialCard;

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
        } else if (event.detail === "end") {
          endCallback();
        } else if (event.detail === "endTut") {
          endTutorialCallback();
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
      canvasPos.x + this.currentTutorialStep.cardX * (canvasSize.width / 1000),
      canvasPos.y + this.currentTutorialStep.cardY * (canvasSize.height / 1000),
      this.currentTutorialStep.cardWidth * (canvasSize.width / 1000),
      this.currentTutorialStep.cardHeight * (canvasSize.height / 1000)
    );
    tut_updateText(this.currentTutorialStep.html);

    if (this.currentTutorialStep.loadLevel) {
      this.loadLevelCallback(this.currentTutorialStep.loadLevel);
    }
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
  objectX: number; //index
  objectY: number; //index
  circleScale?: number;
  cardX: number;
  cardY: number;
  cardWidth: number;
  cardHeight: number;
  loadLevel?: string;
  html: UpdateFunctionWithMethods<unknown>;
}

const tutorial_steps: TutorialStep[] = [
  {
    objectX: -2,
    objectY: -2,
    cardX: 200,
    cardY: 100,
    cardWidth: 300,
    cardHeight: 200,
    loadLevel: "tutorial",
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
    objectY: 4.5,
    circleScale: 1.4,
    cardX: 50,
    cardY: 150,
    cardWidth: 250,
    cardHeight: 350,
    loadLevel: "tutorial_sub_mz",
    html: html`
      <h3>The Basis</h3>
      <p>
        This game is based on a famous physics experiment, that you may or may
        not know from school. It uses different mirrors to reflect and redirect
        light from a laser.
      </p>
      <p>It is called Mach-Zehnder-Interferometer</p>
      <div class="mach_img"><img src="/res/images/mach-zehnder.jpg" /></div>
    `,
  },
  {
    objectX: 4.75,
    objectY: 5,
    circleScale: 1.5,
    cardX: 100,
    cardY: 150,
    cardWidth: 250,
    cardHeight: 250,
    loadLevel: "tutorial_sub_normal",
    html: html`
      <h3>Objects & Particles</h3>
      <p>
        To play this game, there are multiple objects, like mirrors, emitters
        and detectors, that you wille be able place and move around on the
        playing field.
      </p>
      <p>
        These Objects are used to emit and guide different Particles. These
        particles are supposed to visualize light particles and visualize some
        funky quantum mechanical effects.
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
      <h3>The Emitter</h3>
      <p>
        This is the Emitter. This is where the particles and a guiding beam emit
        from and travel across the playing field.
      </p>
    `,
  },
  {
    objectX: 8,
    objectY: 3,
    cardX: 350,
    cardY: 20,
    cardWidth: 600,
    cardHeight: 250,
    html: html`
      <h3>The Detector</h3>
      <p>
        This is the Detector. This is the object where you will try guide the
        particles to from the emitter.
      </p>
      <p>
        When particles hit the detectors, they will start to show a portion of a
        (green) ring around them. This ring shows the distribution of the hits
        between all the detectors, which is the percentage of hits for each
        detector.
      </p>
      <p>
        Once you start to play the levels of this game, there will also be a
        white ring around the detectors. This ring shows you the target
        distribution that you should reach, to successfully finish the level. So
        if a detector has a fully white ring around it, that means that 100% of
        the particles should hit this detector.
      </p>
    `,
  },
  {
    objectX: 4,
    objectY: 3,
    circleScale: 5,
    cardX: 100,
    cardY: 50,
    cardWidth: 300,
    cardHeight: 250,
    html: html`
      <h3>The Mirror</h3>
      <p>
        This is one of the Mirrors. This Mirror acts like any normal mirror,
        that you know from your daily life and can fully redirect the incoming
        particles.
      </p>
      <p>
        You will use these Mirrors to guide the particles form the emitter to
        the detectors.
      </p>
      <p>
        They behave like you would expect, by completely redirecting the
        incoming particles by 90°.
      </p>
    `,
  },
  {
    objectX: 4,
    objectY: 6,
    circleScale: 5,
    cardX: 50,
    cardY: 250,
    cardWidth: 300,
    cardHeight: 250,
    html: html`
      <h3>The Halfmirror</h3>
      <p>
        This is the Halfmirror or Beamsplitter. This Mirror is very special and
        is the main culprit responsible for causing all the <b>funky</b> quantum
        mechanical effects. They have some very special properties that we will
        look at later.
      </p>
      <p>
        For now it is enough to know that the incoming particles that reach this
        mirror will be split up and travel in two directions. One half gets
        redirected 90° and the other half goes straight through the mirror.
      </p>
    `,
  },
  {
    objectX: 3,
    objectY: 5,
    circleScale: 2,
    cardX: 50,
    cardY: 200,
    cardWidth: 350,
    cardHeight: 200,
    html: html`
      <h3>Normal Particles & Quantum Particles</h3>
      <p>
        There are two kinds of particles in this game. Normal particles and
        Quantum particles. In the next step we will look at Normal particles
        first.
      </p>
      <p>
        You will be able choose which kind of particle gets emitted from your
        Emitter by clicking the colored slider on the left side of the control
        bar.
      </p>
    `,
  },
  {
    objectX: 3.25,
    objectY: 6,
    circleScale: 2.5,
    cardX: 50,
    cardY: 150,
    cardWidth: 350,
    cardHeight: 350,
    loadLevel: "tutorial_sub_normal",
    html: html`
      <h3>Normal Particles</h3>
      <p>
        Normal particles are particles, that are meant to follow the normal
        human intuition. They do not behave according to real physics, but more
        like how we naturally think they behave.
      </p>
      <p>
        This intuitive behaviour is relevant for how the particles behave, when
        colliding with a half mirror. When a light particle hits a half mirror,
        you would think that half of the particles, that hit the mirror, will
        get redirected and the other half goes through the mirror. That is
        exactly how the Normal particles behave!
      </p>
      <p>
        But this intuitive behaviour does not reflect reality. It is actually
        wrong! In the next step we will look at Quantum particles, which reflect
        the real (but very unintuive and funky) behaviour.
      </p>
    `,
  },
  {
    objectX: 3.25,
    objectY: 5,
    circleScale: 2,
    cardX: 50,
    cardY: 100,
    cardWidth: 350,
    cardHeight: 400,
    loadLevel: "tutorial_sub1",
    html: html`
      <h3>Quantum Particles: Phase Shift</h3>
      <p>
        These Quantum particles have some added properties, compared to the
        Normal particles, which lets them behave according to real physics. You
        have probably heard that light can behave like a particle and a wave,
        depending on how you look at it. The Quantum particles do exacly that,
        they combine the properties of a particles and a wave. To visualize the
        wave properties, you can see that the particles have a sine curve inside
        of them.
      </p>
      <p>
        This wave property inside the quantum particles gets affected by the
        mirrors. When the particle hits a mirror and gets redirected the phase
        of the wave will get shifted. In our case by 180°. This means that we
        have two phases in this game. The red phase and the blue phase, which
        are shifted from each other by exactly 180°.
      </p>
      <p>
        Later we will look closer at those shifted phases and see how this
        causes the quantum mechanical effect of interference.
      </p>
    `,
  },
  {
    objectX: 5,
    objectY: 6,
    circleScale: 3,
    cardX: 50,
    cardY: 100,
    cardWidth: 400,
    cardHeight: 470,
    loadLevel: "tutorial_sub2",
    html: html`
      <h3>Quantum Particles: Superposition</h3>
      <p>
        Now we will closer at how the Quantum particles behave together with the
        Halfmirror to become super funky. Unlike the Normal particle, when a
        Quantum particle hits a Halfmirror, it does not get sent in one or the
        other direction, it gets split apart and travels in both directions.
      </p>
      <p>
        Well, actually it goes into Superposition. Superposition? Superposition
        is probably the most famous quantum mechanical effect, with a plethora
        of examples like Schrödingers cat. But it is also the hardest to grasp
        nad gives you headaches, because it defies the human intuition.
      </p>
      <p>
        When the Quantum particle hits the Halfmirror and goes into
        Superposition, it does not get split apart, it travels in both
        directions ... at the same time. What? Both directions at the same time?
        How can one particle travel in two directions? The Superposition
        dictates that the particle is in both places at same time, until we look
        at it or observe it. Once we look at one of the two particles (which are
        actually one and the same particle), it will get decided, if the
        particle is actually in the place we looked at or the other by pure
        chance. To simplify things, this chance is 50:50 at the detectors for
        this game.
      </p>
      <p>
        To wrap your head around this funky concept is truly not easy, but we
        will go a bit further and look at one more quantum mechanical effect.
        The Interference.
      </p>
    `,
  },
  {
    objectX: 5,
    objectY: 6,
    circleScale: 3,
    cardX: 50,
    cardY: 200,
    cardWidth: 400,
    cardHeight: 320,
    loadLevel: "tutorial_sub2",
    html: html`
      <h3>Quantum Particles: Amplitude</h3>
      <p>Before looking at Interference, we will look at another effect.</p>
      <p>
        Wwhen the particle hits the half mirror and goes into Superposition, the
        wave property of the particle is also gets afftected in another way.
      </p>
      <p>
        The Amplitude of the wave gets halfed. This means that the intensity of
        the particle gets halfed.
      </p>
      <p>
        This is one of the few effects that you can directly see in reality.
        When light gets split by a half mirror, you can visibly see that the two
        outgoing light beams are dimmer than the original. This correlates with
        the amplitude/intensity of the particles getting halfed by the
        halfmirror.
      </p>
      <p>Next we will look the quantum mechanical effect of Interference.</p>
    `,
  },
  {
    objectX: 4.5,
    objectY: 6.5,
    circleScale: 1.5,
    cardX: 150,
    cardY: 100,
    cardWidth: 700,
    cardHeight: 300,
    loadLevel: "tutorial_sub3",
    html: html`
      <h3>Quantum Particles: Halfmirror</h3>
      <p>
        Before we actually look at Interference. We have to look a little closer
        at the Halfmirror again, to understand some physical properties of the
        mirror, that will lead to the effect of Interference.
      </p>
      <p>
        A Halfmirror is usually a piece of glass, that has a mirroring surface
        on one side of the glass. You can see that the Halfmirror in our game
        has a shiny side with the mirror surface and a non-shiny side.
      </p>
      <p>
        When a Quantum particle hits a Halfmirror, it matters from which side
        the particle hits the mirror. Normally when a particle hits a mirror and
        gets redirected (by 90°) its phase will shift by 180° as we looked at
        earlier. This is not the case with the Halfmirror. When the particle
        hits the shiny mirror surface first, then it behaves like normal and the
        redirected particle will have its phase shifted. However if the particle
        hits the Halfmirror from the other side, where it has to travel through
        the glass first, before hitting the mirror surface, then the phase of
        the redirected particle will not get shifted and stays the same.
      </p>
    `,
  },
  {
    objectX: 4.5,
    objectY: 6.5,
    circleScale: 1.5,
    cardX: 150,
    cardY: 25,
    cardWidth: 700,
    cardHeight: 475,
    html: html`
      <h3>Quantum Particles: Halfmirror</h3>
      <p>
        Without going too much into the physical details, this is caused by the
        different refractive indexes at either side of shiny mirroring surface.
        The refractive index basically describes how much the light will bend
        when entering that medium (like when the light bends, when entering
        water). In our case the glass on one side of the has a higher refractive
        index, than the air on the other side of the mirror. <br />
        low index -> high index : phase shift <br />
        high index -> low index : no phase shift
      </p>
      <div class="refraction_img">
        <img src="/res/images/refraction_shift.png" />
        <img src="/res/images/refraction_noshift.png" />
      </div>
    `,
  },
  {
    objectX: 5,
    objectY: 5,
    circleScale: 1.5,
    cardX: 50,
    cardY: 50,
    cardWidth: 400,
    cardHeight: 400,
    loadLevel: "tutorial_sub4",
    html: html`
      <h3>Quantum Particles: Interference</h3>
      <p>Now we have all the prerequisites to look at Interference.</p>
      <p>
        When a Quantum particle, that is in Superposition, hits a Halfmirror
        with both parts of the Superposition at the same time, then this will
        trigger the Interference effect. 
        <p>
        Theoretically, when each part of the
        Superposition hits the Halfmirror, they will be "split up" again and go
        into another step of Superposition, so you would have 4 parts, that are
        now in Superposition. On one side of the mirror you have 2 parts that
        have opposing phases, which will trigger destructive Interference and
        cause the parts to cancel each other out and make it impossible for the
        Quantum particle to be in that place. The 2 parts on the other side of
        the mirror have the same phase, which will trigger constructive
        Interference, which causes the parts to be amplified.
        </p>
        
        </p>
        <p>
        
        This effectively
        ends the Superposition, because the particle can now only be in one
        place, instead of 4.
        </p>
    `,
  },
  {
    objectX: 5,
    objectY: 5,
    circleScale: 0.5,
    cardX: 100,
    cardY: 150,
    cardWidth: 300,
    cardHeight: 200,
    html: html`
      <h3>Have fun playing!</h3>
      <p>
        You now have all the necessary prerequisites and knowledge to play this
        game and understand what is going on with those funky Quantum Particles.
      </p>
      <p>Enjoy!</p>
    `,
  },
];
