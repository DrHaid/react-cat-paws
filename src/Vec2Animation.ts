import { EasingType } from "./types";
import { Vec2 } from "./Vec2";

export class Vec2Animation {
  from: Vec2;
  to: Vec2;
  progress: number;
  easingType: EasingType;

  constructor(from: Vec2, to: Vec2, easingType: EasingType) {
    this.from = from;
    this.to = to;
    this.progress = 0;
    this.easingType = easingType;
  }

  getNext(delta: number) {
    if (this.progress + delta > 1) {
      this.progress = 1;
      return this.to;
    }

    this.progress += delta;
    const easedProgress = Vec2Animation.getEasedProgress(
      this.progress,
      this.easingType
    );
    return Vec2.lerp(this.from, this.to, easedProgress);
  }

  static getEasedProgress(progress: number, easingType: EasingType): number {
    switch (easingType) {
      case EasingType.LINEAR:
        return progress;

      case EasingType.IN_OUT_SINE:
        return Vec2Animation.easeInOutSine(progress);

      default:
        throw "Unknown easing type";
    }
  }

  static easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
}
