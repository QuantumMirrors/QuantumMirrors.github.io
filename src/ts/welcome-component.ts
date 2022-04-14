import { define, dispatch, html } from "hybrids";

export interface WelcomeCard extends HTMLElement {
  // circleX: number;
  // circleY: number;
  cardX: number;
  cardY: number;
  cardWidth: number;
  cardHeight: number;
  // tutclass: Tutorial;
  triggerUpdate: boolean;
  // activePrevious: boolean;
  // activeNext: boolean;
}

export function welcome_update(
  host: any,
  cardX: number,
  cardY: number,
  cardWidth: number,
  cardHeight: number
) {
  host.cardX = cardX;
  host.cardY = cardY;
  host.cardWidth = cardWidth;
  host.cardHeight = cardHeight;
}

const cardText = () => html`
  <h3>Welcome to this amazing Game</h3>
  <p>
    In this game you will be able to play around with stuff to get a better
    underdstanding of some quantum mechanical effects.
  </p>
  <p>
    The tutorial will guide you through the first steps in this game and provide
    some explanations for the funky physics, that cause the quantum effects,
    which you will encounter in this game.
  </p>

  <p>
    You can choose to play the tutorial for some guidance and in-depth
    explanations or skip it and dive right into the game.
  </p>

  <p class="github_p">
    <span> You can also check out the source code on: </span>
    <a href="https://github.com/QuantumMirrors/QuantumMirrors.github.io"
      ><img src="/res/images/github_logo.png" /><img
        class="github"
        src="/res/images/github_logo_text.png"
    /></a>
  </p>
`;

function skipTutorial(host: any) {
  dispatch(host, "custom-change", { detail: "skipTutorial" });
  host.triggerUpdate = !host.triggerUpdate;
}

function startTutorial(host: any) {
  dispatch(host, "custom-change", { detail: "startTutorial" });
  host.triggerUpdate = !host.triggerUpdate; //weird workaround to trigger a rerender when no other property was changed
}

export default define<WelcomeCard>({
  tag: "welcome-overlay",
  cardX: 0,
  cardY: 0,
  cardWidth: 0,
  cardHeight: 0,
  triggerUpdate: false,
  render: ({ cardY, cardX, cardWidth, cardHeight, triggerUpdate }) =>
    html`
      <div class="welcome">
        <svg>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#0"
            fill-opacity="0.8"
          />
        </svg>
        <div class="welcome-card">
          ${cardText()}
          <button id="skipButton" onclick="${skipTutorial}">
            Skip Tutorial
          </button>
          <button id="startButton" onclick="${startTutorial}">
            Start Tutorial
          </button>
        </div>
      </div>

      <style>
        .welcome-card {
          height: ${cardHeight}px;
          width: ${cardWidth}px;
        }
        @media screen and (min-width: 1000px) {
          .welcome-card {
            bottom: ${cardY}px;
          }

          .github_p {
            display: inline-flex;
            align-items: center;
          }
          .github_p > a {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 20%;
            margin: 0;
            padding-left: 1em;
          }
          .github {
            width: 80%;
          }
        }
        @media screen and (max-width: 500px) {
          .welcome-card {
            height: ${cardHeight * 1.2}px;
          }
        }
        @media screen and (max-width: 1000px) {
          .github_p {
            display: grid;
            align-items: center;
            justify-content: center;
          }
          .github_p > a {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 3em;
          }
          .github {
            width: 20%;
          }
        }

        .welcome {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .welcome-card {
          background: #009b91;
          color: white;
          font-family: "Arial";

          position: relative;

          border-radius: 1em;

          transition: left 2s, top 2s, width 2s, height 2s;
        }

        .welcome-card > * {
          margin: 1em;
        }

        .welcome-card > button {
          display: flex;
          border-radius: 0.3em;
          border: none;
          background: #4f46e5;
          font-weight: bold;
          padding: 1.5%;
        }

        .welcome-card > button:hover {
          background: #a5b4fc;
        }

        .welcome-card > #skipButton {
          position: absolute;
          left: 0;
          bottom: 0;
          color: lightgray;
        }

        .welcome-card > #startButton {
          position: absolute;
          right: 0;
          bottom: 0;
          color: white;
        }

        .welcome-card > h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          display: flex;
          justify-content: center;
        }

        svg {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      </style>
    `,
});
