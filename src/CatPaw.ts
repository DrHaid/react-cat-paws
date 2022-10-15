import { EasingType } from "./types";
import { Vec2 } from "./Vec2";
import { Vec2Animation } from "./Vec2Animation";

export class CatPaw {
  animSequence: Vec2Animation[];
  targetPosition: Vec2;
  position: Vec2;

  constructor(screenSize: Vec2, targetPos: Vec2){
    this.animSequence = [];
    this.targetPosition = targetPos;
    
    const getRandomRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }
    
    // find position on canvas border closest to target
    // TODO: simplify
    const centerX = screenSize.x / 2;
    const centerY = screenSize.y / 2;
    const borderDistX = (targetPos.x <= centerX) ? targetPos.x : screenSize.x - targetPos.x;
    const borderDistY = (targetPos.y <= centerY) ? targetPos.y : screenSize.y - targetPos.y;
    const borderPos = new Vec2(0, 0);
    if(borderDistX < borderDistY){
      borderPos.y = targetPos.y + getRandomRange(-200, 200);
      borderPos.x = (targetPos.x <= centerX) ? 0 : screenSize.x;
    }else{
      borderPos.x = targetPos.x + getRandomRange(-200, 200);
      borderPos.y = (targetPos.y <= centerY) ? 0 : screenSize.y;
    }

    this.position = borderPos;
    this.animSequence = this.getAnimations();
  }

  getAnimations(){
    const moveTo = new Vec2Animation(
      this.position,
      this.targetPosition,
      EasingType.IN_OUT_SINE
    )
    const moveBack = new Vec2Animation(
      this.targetPosition,
      this.position,
      EasingType.IN_OUT_SINE
    )
    return [moveTo, moveBack]
  }

  update(delta: number){
    const activeAnimation = this.animSequence.find((a) => a.progress < 1);
    if(!activeAnimation) return;
    const nextPos = activeAnimation.getNext(delta);
    this.position = nextPos;
    console.log(nextPos);
  }
}