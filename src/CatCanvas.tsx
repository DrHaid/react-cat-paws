import React, { useEffect, useRef } from "react";
import { CatPaw } from "./CatPaw";
import { CatPawRenderer } from "./CatPawRenderer";
import { CatCanvasProps } from "./types";
import { Vec2 } from "./Vec2";

export const CatCanvas = ({ height, width }: CatCanvasProps) => {
  const catPawRenderer = useRef<CatPawRenderer>(new CatPawRenderer());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const clearCanvas = () =>
    ctx.current?.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);

  const renderFrame = () => {
    clearCanvas();

    if (!ctx.current) return;
    catPawRenderer.current.renderFrame(ctx.current, 0.0035);
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    ctx.current = canvasRef.current?.getContext("2d") ?? null;
    catPawRenderer.current.loadImages();
    requestAnimationFrame(tick);
  }, []);

  const addCatPaw = ({ nativeEvent: { clientX, clientY } }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!width || !height) return;
    const screenSize = new Vec2(width, height);
    const targetPos = new Vec2(clientX, clientY);
    catPawRenderer.current.addCatPaw(new CatPaw(screenSize, targetPos));
  }

  return (
    <canvas onClick={addCatPaw} ref={canvasRef} height={height} width={width} />
  )
};