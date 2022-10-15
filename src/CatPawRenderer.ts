import { CatPaw } from "./CatPaw";
import { Vec2 } from "./Vec2";

export class CatPawRenderer {
  catPaws: CatPaw[];
  pawPrints: Vec2[];

  constructor() {
    this.catPaws = [];
    this.pawPrints = [];
  }

  renderFrame(ctx: CanvasRenderingContext2D, frameTime: number) {
    this.drawPawPrints(ctx);
    this.drawCatPaws(ctx, frameTime);
  }

  drawCatPaws(ctx: CanvasRenderingContext2D, delta: number) {
    this.catPaws.forEach((paw) => {
      paw.update(delta);
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(paw.position.x, paw.position.y, 25, 25);
      if (paw.placePawPrint()) {
        this.pawPrints.push(paw.targetPosition)
      }
    })
  }

  drawPawPrints(ctx: CanvasRenderingContext2D) {
    this.pawPrints.forEach((print) => {
      ctx.fillStyle = "#0008FF";
      ctx.fillRect(print.x, print.y, 25, 25);
    })
  }

  addCatPaw(catPaw: CatPaw) {
    this.catPaws.push(catPaw);
  }
}