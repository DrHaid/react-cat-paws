import { EasingType } from "./types";
import { Vec2 } from "./Vec2";
import { Vec2Animation } from "./Vec2Animation";

type PawPrintState = "none" | "pending" | "placed";

export class CatPaw {
  animSequence: Vec2Animation[];
  targetPosition: Vec2;
  position: Vec2;
  rotation: number;
  imageIndex: number;
  pawPrintState: PawPrintState;

  constructor(screenSize: Vec2, targetPos: Vec2, imgIndex: number) {
    this.animSequence = [];
    this.pawPrintState = "none";
    this.targetPosition = targetPos;
    this.imageIndex = imgIndex;

    const getRandomRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // find position on canvas border closest to target
    const borderMargin = 80;
    const offsetRange = 200;
    const centerX = screenSize.x / 2;
    const centerY = screenSize.y / 2;
    const borderDistX = Math.min(targetPos.x, screenSize.x - targetPos.x);
    const borderDistY = Math.min(targetPos.y, screenSize.y - targetPos.y);
    const borderPos = new Vec2(0, 0);
    if (borderDistX < borderDistY) {
      borderPos.y = targetPos.y + getRandomRange(-offsetRange, offsetRange);
      borderPos.x =
        targetPos.x <= centerX ? -borderMargin : screenSize.x + borderMargin;
    } else {
      borderPos.x = targetPos.x + getRandomRange(-offsetRange, offsetRange);
      borderPos.y =
        targetPos.y <= centerY ? -borderMargin : screenSize.y + borderMargin;
    }

    this.position = borderPos;
    this.rotation = this.getRotation();
    this.animSequence = this.getAnimations();
  }

  getRotation() {
    const dir = Vec2.sub(this.targetPosition, this.position);
    const norm = Vec2.normalize(dir);
    let rad = Math.atan(norm.y / norm.x);
    if (dir.x < 0) rad += Math.PI;
    return rad;
  }

  getAnimations() {
    const moveTo = new Vec2Animation(
      this.position,
      this.targetPosition,
      EasingType.IN_OUT_SINE,
    );
    const moveBack = new Vec2Animation(
      this.targetPosition,
      this.position,
      EasingType.IN_OUT_SINE,
    );
    return [moveTo, moveBack];
  }

  update(delta: number) {
    const activeAnimation = this.animSequence.find((a) => a.progress < 1);
    if (!activeAnimation) return false;
    if (this.pawPrintState === "none") {
      if (this.animSequence.indexOf(activeAnimation) === 1) {
        this.pawPrintState = "pending";
      }
    }
    const nextPos = activeAnimation.getNext(delta);
    this.position = nextPos;
    return true;
  }

  placePawPrint() {
    if (this.pawPrintState === "pending") {
      this.pawPrintState = "placed";
      return true;
    }
    return false;
  }
}
