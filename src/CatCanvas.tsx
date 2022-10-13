import React, { useEffect, useRef } from "react";
import { CatCanvasProps, EasingType } from "./types";
import { Vec2Animation } from "./Vec2Animation";

export const CatCanvas = ({ height, width }: CatCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const testAnimation = useRef(
    new Vec2Animation({ x: 0, y: 0 }, { x: 500, y: 500 }, EasingType.IN_OUT_SINE)
  );

  const clearCanvas = () =>
    ctx.current?.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);

  const renderFrame = () => {
    if (!ctx.current || !canvasRef.current) return;

    clearCanvas();

    // draw test square with position animation
    const pos = testAnimation.current.getNext(0.0005);
    ctx.current.fillStyle = "#FF0000";
    ctx.current.fillRect(pos.x, pos.x, 25, 25);
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

  return (
    <canvas ref={canvasRef} height={height} width={width} />
  )
};