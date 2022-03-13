import p5 from "p5";
import { GameGrid } from "./models/game_grid";
import { GameObject } from "./models/game_object";
import { GameObjectPopup } from "./models/game_object_popup";

export class SpiegelDemo {
  private sketch = (p: p5) => {
    const gameGrid = new GameGrid();
    const gameObjectPopup = new GameObjectPopup(p, gameGrid);

    let fpsSlider: p5.Element;
    let particleSlider: p5.Element;
    let particleCounter = 0;
    let levelSelect: any; // doesnt work with p5.Element

    //TODO: fix dragging ... ITS BWOKEN
    let is_drag = false;
    p.mouseDragged = () => {
      if (!is_drag) {
        is_drag = true;
        gameGrid.grid_drag_start(p);
      }
    };

    p.setup = () => {
      //setup canvas
      const canvas = p.createCanvas(1000, 1000);
      canvas.parent("mirror-game");
      canvas.mouseClicked(() => {
        if (is_drag) {
          gameGrid.grid_drag_end(p);
          is_drag = false;
        } else {
          gameGrid.grid_clicked(p, (x, y, field_size) => {
            gameObjectPopup.show(x, y, field_size);
          });
        }
      });

      p.angleMode(p.DEGREES);
      p.rectMode(p.CENTER);
      p.frameRate(60);

      //setup additional elements
      fpsSlider = p.createSlider(0, 60, 60, 1);
      particleSlider = p.createSlider(1, 10, 5, 0.5);

      levelSelect = p.createSelect();
      levelSelect.option("Tutorial");
      levelSelect.option("Sandbox");
      levelSelect.option("Level 1");
      levelSelect.option("Level 2");

      levelSelect.changed(async () => {
        const level: string = levelSelect.value();
        if (level == "Tutorial") {
          //TODO: implement Tutorial
        } else if (level == "Sandbox") {
          gameGrid.clearGrid();
        } else {
          //load new level
          await loadLevel(`level${level.slice(-1)}`);
        }
      });

      fpsSlider.parent("top-bar");
      particleSlider.parent("top-bar");
      levelSelect.parent("top-bar");

      //load Level 1
      levelSelect.selected("Level 1");
      loadLevel("level1");

      // p.noLoop();
    };

    p.draw = () => {
      console.log(is_drag);

      const fps = Number(fpsSlider.value());
      if (fps == 0) {
        return;
      }
      p.frameRate(fps);

      p.clear(0, 0, 0, 0);
      p.background(64);

      gameGrid.draw(p);

      //counter for adding particles
      particleCounter++;
      if (particleCounter >= Number(particleSlider.value()) * 60) {
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
