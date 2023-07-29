import { Vec2 } from "./Vec2";

export class PawPrint {
  position: Vec2;
  rotation: number;
  imageIndex: number;

  constructor(position: Vec2, rotation: number, imgIndex: number) {
    this.position = position;
    this.rotation = rotation;
    this.imageIndex = imgIndex;
  }
}
