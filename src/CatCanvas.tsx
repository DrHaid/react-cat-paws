import React, { MouseEventHandler, useEffect, useRef } from "react";
import { CatPaw } from "./CatPaw";
import { CatCanvasProps, EasingType } from "./types";
import { Vec2 } from "./Vec2";
import { Vec2Animation } from "./Vec2Animation";

export const CatCanvas = ({ height, width }: CatCanvasProps) => {
  const catPaws = useRef<CatPaw[]>([]);
  const catPawPrints = useRef<Vec2[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const clearCanvas = () =>
    ctx.current?.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);

  const renderFrame = () => {
    clearCanvas();

    catPawPrints.current.forEach((print) => {
      if (!ctx.current || !canvasRef.current) return;
      ctx.current.fillStyle = "#0008FF";
      ctx.current.fillRect(print.x, print.y, 25, 25);
    })

    catPaws.current.forEach((paw) => {
      if (!ctx.current || !canvasRef.current) return;
      paw.update(0.0035);
      ctx.current.fillStyle = "#FF0000";
      ctx.current.fillRect(paw.position.x, paw.position.y, 25, 25);
      if(paw.placePawPrint()){
        catPawPrints.current.push(paw.targetPosition)
      }
    })
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    ctx.current = canvasRef.current?.getContext("2d") ?? null;
    requestAnimationFrame(tick);
  }, []);

  const addCatPaw = ({nativeEvent: {clientX, clientY}}: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if(!width||!height) return;
    const screenSize = new Vec2(width, height);
    const targetPos = new Vec2(clientX, clientY);
    catPaws.current.push(new CatPaw(screenSize, targetPos));
  }

  return (
    <canvas onClick={addCatPaw} ref={canvasRef} height={height} width={width} />
  )
};