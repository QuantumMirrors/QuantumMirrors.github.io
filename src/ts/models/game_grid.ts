import p5 from "p5";
import { FieldTile } from "./field_tile";
import { BaseObject, Direction, GameObject } from "./game_object";
import { HalfMirror } from "./half_mirror";
import { NewParticle } from "./new_particle";
import { StartPoint } from "./start_block";

export class GameGrid {
  // 10 x 10 grid
  private grid: FieldTile[][];
  public gridSize = 10;

  //TODO: noch ändern mit dem startpoint
  private start: StartPoint;
  private startX: number;
  private startY: number;

  //TODO: maybe anders
  private is_drag = false;
  private dragX: number;
  private dragY: number;

  private particles: NewParticle[];

  constructor() {
    //initialize grid
    this.clearGrid();
  }

  draw(p: p5) {
    p.push();

    //draw laser beam
    if (this.start) {
      this.beam_loop_start(p);
    }

    //draw fields with objects
    this.grid.forEach((row, y_idx) =>
      row.forEach((field_tile, x_idx) => field_tile.draw(p, x_idx, y_idx))
    );

    //draw particles
    this.drawParticles(p);

    p.pop();
  }

  //particle handling
  addParticle(p: p5) {
    if(!this.start){
        return;
    }

    const [x, y] = FieldTile.calc_middle_of_tile(
      p,
      this.startX,
      this.startY,
      this.gridSize
    );
    this.particles.push(new NewParticle(x, y, this.start.direction));
  }

  private drawParticles(p: p5) {
    this.particles.forEach((particle) => {
      particle.move();
      if (particle.checkOutOfBounds(p)) {
        //remove particle
        let idx = this.particles.indexOf(particle);
        this.particles.splice(idx, 1);
      } else {
        //draw particle
        particle.draw(p);
        this.checkParticleCollision(p, particle);
      }
    });
  }

  private checkParticleCollision(p: p5, particle: NewParticle) {
    const [x, y] = particle.getXY();
    if (!this.checkPosition(p, x, y)) {
      return;
    }

    const [x_idx, y_idx] = this.getIndex(p, x, y);
    if (this.grid[y_idx][x_idx].check_object()) {
      const [obj_x, obj_y] = FieldTile.calc_middle_of_tile(
        p,
        x_idx,
        y_idx,
        this.gridSize
      );
      if (obj_x == x && obj_y == y) {
        //TODO: refactor this later
        let new_dirs = this.grid[y_idx][x_idx].get_directions(
          particle.getDirection()
        );
        if (new_dirs.length == 0) {
          //end_point
          //remove particle
          let idx = this.particles.indexOf(particle);
          this.particles.splice(idx, 1);
        } else if (new_dirs.length == 1) {
          //full mirror
          particle.setDirection(new_dirs.pop());
          particle.shiftPhase();
        } else if (new_dirs.length == 2) {
          //half mirror
          particle.setSuperposition(true); // goes straight ahead

          const mirror = this.grid[y_idx][x_idx].get_object() as HalfMirror;
          const shift_phase = mirror.checkPhaseShift(particle.getDirection());

          const new_particle = new NewParticle(x, y, new_dirs.pop()); //gets mirrored
          new_particle.setSuperposition(true);
          new_particle.setPhase(
            shift_phase ? !particle.getPhase() : particle.getPhase()
          );

          this.particles.push(new_particle);
        }
      }
    }
  }

  //handling of clicking and dragging in the grid
  grid_clicked(
    p: p5,
    trigger_popup: (x_idx: number, y_idx: number, field_size: number) => void
  ) {
    if (!this.checkMousePosition(p)) {
      return;
    }

    const [x, y] = this.getIndex(p, p.mouseX, p.mouseY);

    if (this.grid[y][x].check_object()) {
      this.grid[y][x].rotate_object();
    } else {
      trigger_popup(x, y, Math.floor(p.width / this.gridSize));
    }
  }

  //TODO: dragged object should change tile to dragged over tile (for laser beam)
  grid_drag_start(p: p5) {
    if (!this.checkMousePosition(p)) {
      return;
    }

    [this.dragX, this.dragY] = this.getIndex(p, p.mouseX, p.mouseY);

    this.is_drag = true;
    this.grid[this.dragY][this.dragX].set_dragged(true);
  }

  grid_drag_end(p: p5) {
    if (!this.checkMousePosition(p)) {
      this.grid[this.dragY][this.dragX].set_dragged(false);
      return;
    }

    const [end_x, end_y] = this.getIndex(p, p.mouseX, p.mouseY);

    //swap dragged object with target object
    let tmp = this.grid[this.dragY][this.dragX].get_object();
    this.grid[this.dragY][this.dragX].change_object(
      this.grid[end_y][end_x].get_object()
    );
    this.grid[end_y][end_x].change_object(tmp);

    if (tmp instanceof StartPoint) {
      this.startX = end_x;
      this.startY = end_y;
    }

    this.is_drag = false;
    this.grid[this.dragY][this.dragX].set_dragged(false);
  }

  //handling of the laser beams
  private beam_loop_start(p: p5) {
    //TODO: only do this if the dragged object is the startpoint
    if (this.is_drag) {
      this.beam_loop(
        this.getIndex(p, p.mouseX, p.mouseY),
        this.start.getDirections().pop(),
        p
      );
    } else {
      this.beam_loop(
        [this.startX, this.startY],
        this.start.getDirections().pop(),
        p
      );
    }
  }

  //TODO: bug when clicking (rotating) second half mirror, game breaks
  private beam_loop(startpoint: number[], dir: Direction, p: p5) {
    let idx_arr = [...startpoint];
    for (let i = 0; i < this.gridSize; i++) {
      idx_arr = this.idxCalc(idx_arr, dir);
      if (this.idxCheck(idx_arr)) {
        this.draw_beam(startpoint[0], startpoint[1], idx_arr[0], idx_arr[1], p);
        break;
      }
      if (this.grid[idx_arr[1]][idx_arr[0]].check_object()) {
        this.draw_beam(startpoint[0], startpoint[1], idx_arr[0], idx_arr[1], p);

        //get new directions from next object and repeat beam_loop
        let new_dirs = this.grid[idx_arr[1]][idx_arr[0]].get_directions(dir);
        new_dirs.forEach((dir) => this.beam_loop([...idx_arr], dir, p));

        break;
      }
    }
  }

  private draw_beam(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    p: p5
  ) {
    p.push();

    const fieldSize = Math.floor(p.width / this.gridSize);
    const middle = Math.floor(fieldSize / 2);
    const x_start = middle + startX * fieldSize;
    const y_start = middle + startY * fieldSize;
    const x_end = middle + endX * fieldSize;
    const y_end = middle + endY * fieldSize;

    p.stroke(255, 0, 0);
    p.line(x_start, y_start, x_end, y_end);

    p.pop();
  }

  //adds the direction to the index_array
  private idxCalc = (arr: number[], dir: Direction) =>
    arr.map((num, idx) => num + dir[idx]);
  //checks if the index_array has indexes that are out of bounds
  private idxCheck = (arr: number[]) => {
    return arr
      .map((num) => num < 0 || num >= this.gridSize)
      .reduce((prev, cur) => prev || cur);
  };

  private getIndex(p: p5, x: number, y: number): [number, number] {
    const field_size = Math.floor(p.width / this.gridSize);
    const x_idx = Math.floor(x / field_size);
    const y_idx = Math.floor(y / field_size);

    return [x_idx, y_idx];
  }

  //true if inside grid, false if outside grid
  private checkMousePosition(p: p5): boolean {
    return !(
      p.mouseX < 0 ||
      p.mouseX > p.width ||
      p.mouseY < 0 ||
      p.mouseY > p.height
    );
  }

  private checkPosition(p: p5, x: number, y: number): boolean {
    return !(x < 0 || x >= p.width || y < 0 || y >= p.height);
  }

  //TODO: fix dragging/clicking bug after adding object
  add_game_object(obj: GameObject, x_idx: number, y_idx: number) {
    this.grid[y_idx][x_idx].change_object(obj);
    if (obj instanceof StartPoint) {
      this.start = obj;
      this.startX = x_idx;
      this.startY = y_idx;
    }
  }

  clearGrid() {
    this.start = null;
    this.particles = [];
    this.grid = [];
    for (let index = 0; index < this.gridSize; index++) {
      let temp_row: FieldTile[] = [];
      for (let j = 0; j < this.gridSize; j++) {
        temp_row.push(new FieldTile(this.gridSize));
      }
      this.grid.push(temp_row);
    }
  }
}
