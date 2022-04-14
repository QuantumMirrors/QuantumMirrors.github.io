import p5 from "p5";
import { GameGrid } from "./models/game_grid";
import { GameObject } from "./models/game_object";
import { GameObjectPopup } from "./models/game_object_popup";
import { ParticleTypes } from "./models/particle";
import { TutorialOverlay } from "./tutorial";
import { WelcomeScreenOverlay } from "./welcomescreen";

export class MirrorGame {
  private sketch = (p: p5) => {
    let canvas: p5.Renderer;

    const gameGrid = new GameGrid();
    const gameObjectPopup = new GameObjectPopup(p, gameGrid);

    let fpsSlider: p5.Element;
    let particleSlider: p5.Element;
    let particleCounter = 0;
    let levelSelect: any; // doesnt work with p5.Element
    let playButton: p5.Element;
    let nextLevelButton: p5.Element;
    let particleChooser: any; // doesnt work with p5.Element

    let tutorial: TutorialOverlay;
    let welcome: WelcomeScreenOverlay;

    let is_drag = false;

    p.setup = () => {
      //lock screen orientation for mobile devices
      // if (p.windowHeight < 1000 || p.windowWidth < 1000) {
      //   window.screen.orientation
      //     .lock("portrait")
      //     .then(() => console.log("lockered"))
      //     .catch(() => console.log("error"));
      //   console.log("locked");
      // }
      // console.log(window.screen.orientation);
      
      //setup canvas
      canvas = p.createCanvas(1000, 1000);
      canvas.parent("mirror-game");

      canvas.mousePressed(() => {
        // console.log("press");
        setTimeout(() => {
          if (p.mouseIsPressed) {
            is_drag = true;
            gameGrid.grid_drag_start(p);
          }
        }, 250);
      });

      canvas.touchStarted(() => {
        // console.log("touch");
        setTimeout(() => {
          if (p.mouseIsPressed) {
            is_drag = true;
            gameGrid.grid_drag_start(p);

            document
              .getElementsByTagName("body")[0]
              .classList.add("body-no-pan");
          }
        }, 250);
      });

      canvas.mouseReleased(() => {
        // console.log("release");
        if (is_drag) {
          gameGrid.grid_drag_end(p);
          is_drag = false;
        } else {
          gameGrid.grid_clicked(p, (x, y, mid_x, mid_y) => {
            gameObjectPopup.show(x, y, mid_x, mid_y);
          });
        }
      });

      canvas.touchEnded(() => {
        // console.log("touchend");
        if (is_drag) {
          gameGrid.grid_drag_end(p);
          is_drag = false;

          document
            .getElementsByTagName("body")[0]
            .classList.remove("body-no-pan");
        }
      });

      p.windowResized = () => {
        const canvasPos = canvas.position() as { x: number; y: number };
        const height = p.windowHeight - canvasPos.y;
        const width = p.windowWidth;
        const size = height >= width ? width : height;
        p.resizeCanvas(size, size);
        gameGrid.setNewScale(size / 1000);

        gameObjectPopup.windowResized(p);
        nextLevelButton.style("top", `${size}px`);
      };

      p.angleMode(p.DEGREES);
      p.rectMode(p.CENTER);
      p.frameRate(60);

      //setup additional elements
      fpsSlider = p.createSlider(1, 120, 60, 1);
      particleSlider = p.createSlider(-10, -1, -5, 0.5); //negative, because high number == low particle count

      levelSelect = p.createSelect();
      levelSelect.option("Tutorial");
      levelSelect.option("Sandbox");
      levelSelect.option("Level 1");
      levelSelect.option("Level 2");
      levelSelect.option("Level 3");
      levelSelect.option("Level 4");
      levelSelect.option("Level 5");
      levelSelect.option("Level 6");
      levelSelect.option("Level 7");
      levelSelect.option("Level 8");
      levelSelect.option("Level 9");
      // levelSelect.option("Level 10");

      levelSelect.changed(async () => {
        const level: string = levelSelect.value();
        if (level == "Tutorial") {
          await loadLevel("tutorial");
          tutorial = new TutorialOverlay(
            canvas,
            p,
            gameGrid.gridSize,
            loadLevel,
            () => {
              levelSelect.selected("Level 1");
              loadLevel("level1");
              tutorial.remove();
            },
            () => {
              tutorial.remove();
            }
          );
          tutorial.start();
        } else if (level == "Sandbox") {
          gameGrid.clearGrid();
        } else {
          //load new level
          await loadLevel(`level${level.slice(-1)}`);
        }
      });
      levelSelect.addClass("level-select");

      playButton = p.createButton("Pause");
      playButton.mousePressed(() => {
        if (playButton.html() === "Play") {
          // p.saveCanvas("test", "png"); //for saving image of canvas
          p.loop();
          playButton.html("Pause");
        } else if (playButton.html() === "Pause") {
          p.noLoop();
          playButton.html("Play");
        }
      });
      playButton.addClass("play-btn");

      nextLevelButton = p.createButton("Next Level");
      nextLevelButton.mouseClicked(() => {
        const currentLevel = Number(levelSelect.selected().slice(-1));
        levelSelect.selected(`Level ${currentLevel + 1}`);
        loadLevel(`level${currentLevel + 1}`);
        nextLevelButton.hide();
      });
      nextLevelButton.addClass("next-btn");
      nextLevelButton.hide();

      particleChooser = p.createCheckbox("", true);
      particleChooser.changed(() => gameGrid.clearParticles());
      let label = particleChooser.child()[0] as HTMLLabelElement;
      label.className = "particle-chooser";
      let switchDiv = p.createDiv();
      switchDiv.addClass("slider");
      switchDiv.addClass("round");
      switchDiv.parent(label);

      fpsSlider.parent("controls");
      particleSlider.parent("controls");
      playButton.parent("controls");
      particleChooser.parent("particle_chooser");
      levelSelect.parent("controls");

      fpsSlider.addClass("range_slider");
      particleSlider.addClass("range_slider");

      //load tutorial level
      levelSelect.selected("Tutorial");
      loadLevel("tutorial");

      //initialize overlays
      tutorial = new TutorialOverlay(
        canvas,
        p,
        gameGrid.gridSize,
        loadLevel,
        () => {
          levelSelect.selected("Level 1");
          loadLevel("level1");
          tutorial.remove();
        },
        () => {
          tutorial.remove();
        }
      );
      welcome = new WelcomeScreenOverlay(
        () => {
          levelSelect.selected("Level 1");
          loadLevel("level1");
          welcome.remove();
        },
        () => {
          welcome.remove();
          tutorial.start();
        }
      );

      //start welcome overlay
      p.windowResized();
      welcome.start();
    };

    p.draw = () => {
      const fps = Number(fpsSlider.value());
      p.frameRate(fps);

      p.clear(0, 0, 0, 0);
      // p.background("#334152");
      // p.background(255, 255, 255, 1);

      gameGrid.draw(p);

      //counter for adding particles
      particleCounter++;
      if (particleCounter >= Math.abs(Number(particleSlider.value())) * 60) {
        gameGrid.addParticle(
          p,
          particleChooser.checked()
            ? ParticleTypes.Quantum
            : ParticleTypes.Normal
        );
        particleCounter = 0;
      }

      //check if next level button should be active
      gameGrid.checkNextLevel() &&
      levelSelect.selected() !== "Sandbox" &&
      levelSelect.selected() !== "Tutorial"
        ? nextLevelButton.show()
        : nextLevelButton.hide();
    };

    const loadLevel = async (level: string) => {
      //load level
      gameGrid.clearGrid();
      await import(`../res/levels/${level}`).then((level) => {
        particleChooser.checked(level.default()["quantum_particle"]);

        level
          .default()
          ["objects"].forEach((game_object: [GameObject, number, number]) =>
            gameGrid.add_game_object(...game_object)
          );
      });
    };
  };

  public game(): (p: p5) => void {
    return this.sketch;
  }
}
