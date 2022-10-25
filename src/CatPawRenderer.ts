import { CatPaw } from "./CatPaw";
import { CATPAW_PATHS, PAWPRINT_PATHS } from "./images";
import { PawPrint } from "./PawPrint";
import { Vec2 } from "./Vec2";

export class CatPawRenderer {
  catPaws: CatPaw[];
  pawPrints: PawPrint[];
  catPawImageCache: ImageBitmap[];
  pawPrintImageCache: ImageBitmap[];

  constructor() {
    this.catPaws = [];
    this.pawPrints = [];
    this.catPawImageCache = [];
    this.pawPrintImageCache = [];
  }

  loadImages() {
    CATPAW_PATHS.forEach((path) =>
      fetch(path)
        .then((resp) => resp.blob())
        .then((blb) => createImageBitmap(blb))
        .then((btm) => this.catPawImageCache.push(btm))
    );
    PAWPRINT_PATHS.forEach((path) =>
      fetch(path)
        .then((resp) => resp.blob())
        .then((blb) => createImageBitmap(blb))
        .then((btm) => this.pawPrintImageCache.push(btm))
    );
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    image: ImageBitmap,
    pos: Vec2,
    rotation: number,
    scale = 1,
    pivot: Vec2 = new Vec2(0, 0)
  ) {
    ctx.setTransform(scale, 0, 0, scale, pos.x, pos.y);
    ctx.rotate(rotation);
    ctx.drawImage(image, -pivot.x, -pivot.y);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  renderFrame(ctx: CanvasRenderingContext2D, frameTime: number) {
    this.drawPawPrints(ctx);
    this.drawCatPaws(ctx, frameTime);
  }

  drawCatPaws(ctx: CanvasRenderingContext2D, delta: number) {
    const cleanup: CatPaw[] = [];
    this.catPaws.forEach((paw) => {
      if (!paw.update(delta)) {
        cleanup.push(paw);
      }
      this.drawImage(
        ctx,
        this.catPawImageCache[0],
        paw.position,
        paw.rotation,
        2,
        new Vec2(235, 32)
      );
      if (paw.placePawPrint()) {
        this.pawPrints.push(new PawPrint(paw.targetPosition, paw.rotation));
      }
    });
    // remove cat paws with finished animations
    cleanup.forEach((paw) => {
      const index = this.catPaws.indexOf(paw, 0);
      if (index > -1) {
        this.catPaws.splice(index, 1);
      }
    });
  }

  drawPawPrints(ctx: CanvasRenderingContext2D) {
    this.pawPrints.forEach((print) => {
      this.drawImage(
        ctx,
        this.pawPrintImageCache[0],
        print.position,
        print.rotation,
        2,
        new Vec2(32, 32)
      );
    });
  }

  addCatPaw(catPaw: CatPaw) {
    this.catPaws.push(catPaw);
  }
}
