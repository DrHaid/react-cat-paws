import { getRandomInt, PAWPRINT_PATHS } from "./images";
import { Vec2 } from "./Vec2";

export class PawPrint {
  position: Vec2;
  rotation: number;
  imageIndex: number;

  constructor(position: Vec2, rotation: number) {
    this.position = position;
    this.rotation = rotation;
    this.imageIndex = this.getImage();
  }

  getImage() {
    return getRandomInt(PAWPRINT_PATHS.length - 1);
  }
}
