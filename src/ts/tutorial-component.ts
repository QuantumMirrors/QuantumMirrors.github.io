import { define, dispatch, html } from "hybrids";

export interface TutorialCard extends HTMLElement {
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

export function tut_update(
  host: any,
  circleX: number,
  circleY: number,
  cirecleSize: number,
  cardX: number,
  cardY: number,
  cardWidth: number,
  cardHeight: number
) {
  host.circleX = circleX;
  host.circleY = circleY;
  host.cirecleSize = cirecleSize;
  host.cardX = cardX;
  host.cardY = cardY;
  host.cardWidth = cardWidth;
  host.cardHeight = cardHeight;
}

export function tut_updateText(htmlText: any) {
  cardText = () => htmlText;
}

export function tut_activeButtons(host: any, next: boolean, previous: boolean) {
  host.activeNext = next;
  host.activePrevious = previous;
}

let cardText = () => html`bitches`;

function next(host: any) {
  dispatch(host, "custom-change", { detail: "next" });
  host.triggerUpdate = !host.triggerUpdate;
}

function previous(host: any) {
  dispatch(host, "custom-change", { detail: "previous" });
  host.triggerUpdate = !host.triggerUpdate; //weird workaround to trigger a rerender when no other property was changed
}

function end(host: any) {
  dispatch(host, "custom-change", { detail: "end" });
  host.triggerUpdate = !host.triggerUpdate;
}

function endTutorial(host: any) {
  dispatch(host, "custom-change", { detail: "endTut" });
  host.triggerUpdate = !host.triggerUpdate;
}

export default define<TutorialCard>({
  tag: "tutorial-overlay",
  circleX: 0,
  circleY: 0,
  cirecleSize: 0,
  cardX: 0,
  cardY: 0,
  cardWidth: 0,
  cardHeight: 0,
  triggerUpdate: false,
  activePrevious: false,
  activeNext: false,
  render: ({
    circleX,
    circleY,
    cirecleSize,
    cardY,
    cardX,
    cardWidth,
    cardHeight,
    triggerUpdate,
    activePrevious,
    activeNext,
  }) =>
    html`
      <div class="tutorial">
        <svg>
          <defs>
            <mask id="mask" x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
              <circle cx="${circleX}" cy="${circleY}" r="${cirecleSize}" />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            mask="url(#mask)"
            fill-opacity="0.8"
          />
        </svg>
        <div class="tutorial-card">
          <div class="card-content">${cardText()}</div>
          <button
            id="previousButton"
            hidden="${activePrevious ? "" : "hidden"}"
            onclick="${previous}"
          >
            Previous
          </button>
          <button
            id="nextButton"
            hidden="${activeNext ? "" : "hidden"}"
            onclick="${next}"
          >
            Next
          </button>
          <button
            id="nextButton"
            hidden="${activeNext ? "hidden" : ""}"
            onclick="${endTutorial}"
          >
            End Tutorial
          </button>
          <button id="endButton" onclick="${end}">X</button>
        </div>
      </div>

      <style>
        .tutorial {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        @media screen and (min-width: 1300px) {
          .tutorial-card {
            height: ${cardHeight}px;
            width: ${cardWidth}px;
            left: ${cardX}px;
            top: ${cardY}px;
          }

          img {
            max-width: 100%;
          }

          .refraction_img {
            display: flex;
          }
          .refraction_img > img {
            max-width: 50%;
          }
        }
        @media screen and (max-width: 2000px) and (min-width: 1200px) {
          .tutorial-card {
            font-size: 0.85em;
          }

          img {
            max-width: 100%;
          }

          .refraction_img {
            display: flex;
          }

          .refraction_img > img {
            max-width: 50%;
          }
        }

        @media screen and (max-width: 1300px) and (min-width: 850px) {
          .tutorial-card {
            font-size: 0.65em;
            height: ${cardHeight}px;
            width: ${cardWidth + cardX / 2}px;
            left: ${cardX / 2}px;
            top: ${cardY}px;
          }

          img {
            max-width: 70%;
          }

          .refraction_img {
            display: flex;
          }

          .refraction_img > img {
            max-width: 35%;
          }
        }
        @media screen and (max-width: 1000px) {
          .tutorial-card {
            height: 40%;
            width: 100%;
            font-size: 1em;
          }

          .tutorial {
            display: flex;
            justify-content: center;
            align-items: end;
          }

          .card-content {
            width: auto;
            height: 75%;
            overflow-y: scroll;
          }

        }

        .tutorial-card {
          background: #009b91;
          color: white;
          font-family: "Arial";
          border-radius: 1em;
          overflow: hidden;

          position: absolute;

          transition: left 2s, top 2s, width 2s, height 2s;
        }

        .tutorial-card > * {
          margin: 1em;
        }

        .tutorial-card > button {
          border-radius: 0.3em;
          border: none;
          background: #4f46e5;
          font-weight: bold;
          padding: 1.5%;
        }

        .tutorial-card > button:hover {
          background: #a5b4fc;
          cursor: pointer;
        }

        .tutorial-card > #previousButton {
          position: absolute;
          left: 0;
          bottom: 0;
          color: lightgray;
        }

        .tutorial-card > #nextButton {
          position: absolute;
          right: 0;
          bottom: 0;
          color: white;
        }

        .tutorial-card > #endButton {
          position: absolute;
          right: 0;
          top: 0;
          color: white;
          background: none;
        }

        
        .tutorial-card > h1,
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
