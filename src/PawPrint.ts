import { Vec2 } from "./Vec2";

export class PawPrint{
  position: Vec2;
  rotation: number;

  constructor(position: Vec2, rotation: number){
    this.position = position;
    this.rotation = rotation;
  }
}