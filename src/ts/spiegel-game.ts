import p5 from "p5";
import { GameGrid } from "./models/game_grid";
import { GameObject } from "./models/game_object";
import { GameObjectPopup } from "./models/game_object_popup";
import { Tutorial } from "./tutorial";
import { WelcomeScreen } from "./welcomescreen";

export class SpiegelDemo {
  private sketch = (p: p5) => {
    let canvas: p5.Renderer;

    const gameGrid = new GameGrid();
    const gameObjectPopup = new GameObjectPopup(p, gameGrid);

    let fpsSlider: p5.Element;
    let particleSlider: p5.Element;
    let particleCounter = 0;
    let levelSelect: any; // doesnt work with p5.Element
    let playButton: p5.Element;

    let tutorial: Tutorial;
    let welcome: WelcomeScreen;

    let is_drag = false;

    p.setup = () => {
      //setup canvas
      canvas = p.createCanvas(1000, 1000);
      canvas.parent("mirror-game");

      canvas.mousePressed(() => {
        // console.log("press");
        setTimeout(() => {
          if(p.mouseIsPressed){
            is_drag = true;
            gameGrid.grid_drag_start(p);
          }
        }, 250);
      });

      canvas.touchStarted(() => {
        // console.log("touch");
        setTimeout(() => {
          if(p.mouseIsPressed){
            is_drag = true;
            gameGrid.grid_drag_start(p);
          }
        }, 250);
      })

      canvas.mouseReleased(() => {
        // console.log("release");
        if(is_drag){
          gameGrid.grid_drag_end(p);
          is_drag = false;
        } else {
          gameGrid.grid_clicked(p, (x, y, field_size) => {
            gameObjectPopup.show(x, y, field_size);
          });
        }
      })

      canvas.touchEnded(() => {
        // console.log("touchend");
        if(is_drag){
          gameGrid.grid_drag_end(p);
          is_drag = false;
        }
      })



      p.windowResized = () => {
        const canvasPos = canvas.position() as { x: number; y: number };
        const height = p.windowHeight - canvasPos.y;
        const width = p.windowWidth;
        const size = height >= width ? width : height;
        p.resizeCanvas(size, size);
      };
      p.windowResized();

      p.angleMode(p.DEGREES);
      p.rectMode(p.CENTER);
      p.frameRate(60);

      //setup additional elements
      fpsSlider = p.createSlider(1, 60, 60, 1);
      particleSlider = p.createSlider(-10, -1, -5, 0.5); //negative, because high number == low particle count

      levelSelect = p.createSelect();
      levelSelect.option("Tutorial");
      levelSelect.option("Sandbox");
      levelSelect.option("Level 1");
      levelSelect.option("Level 2");

      levelSelect.changed(async () => {
        const level: string = levelSelect.value();
        if (level == "Tutorial") {
          await loadLevel("tutorial");
          tutorial = new Tutorial(canvas, p, gameGrid.gridSize);
          tutorial.start();
        } else if (level == "Sandbox") {
          gameGrid.clearGrid();
        } else {
          //load new level
          await loadLevel(`level${level.slice(-1)}`);
        }
      });

      playButton = p.createButton("Pause");
      playButton.mousePressed(() => {
        if (playButton.html() === "Play") {
          p.loop();
          playButton.html("Pause");
        } else if (playButton.html() === "Pause") {
          p.noLoop();
          playButton.html("Play");
        }
      });

      fpsSlider.parent("controls");
      particleSlider.parent("controls");
      playButton.parent("controls");
      levelSelect.parent("controls");

      //load tutorial
      levelSelect.selected("Tutorial");
      loadLevel("tutorial");

      // p.noLoop();

      tutorial = new Tutorial(canvas, p, gameGrid.gridSize);
      welcome = new WelcomeScreen(
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

      welcome.start();
    };

    p.draw = () => {
      // console.log(is_drag);

      const fps = Number(fpsSlider.value());
      if (fps == 0) {
        return;
      }
      p.frameRate(fps);

      p.clear(0, 0, 0, 0);
      p.background("#334152");

      gameGrid.draw(p);

      //counter for adding particles
      particleCounter++;
      if (particleCounter >= Math.abs(Number(particleSlider.value())) * 60) {
        gameGrid.addParticle(p);
        particleCounter = 0;
      }
    };

    const loadLevel = async (level: string) => {
      //load level
      gameGrid.clearGrid();
      await import(`../res/levels/${level}`).then((level) => {
        level
          .default()
          .forEach((game_object: [GameObject, number, number]) =>
            gameGrid.add_game_object(...game_object)
          );
      });
    };
  };

  public game(): (p: p5) => void {
    return this.sketch;
  }
}
