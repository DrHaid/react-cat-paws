import React, { useEffect, useRef } from "react";
import { CatPaw } from "./CatPaw";
import { CatPawRenderer } from "./CatPawRenderer";
import { CatCanvasProps } from "./types";
import { Vec2 } from "./Vec2";

export const CatCanvas = ({ height, width }: CatCanvasProps) => {
  const catPawRenderer = useRef<CatPawRenderer>(new CatPawRenderer());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const lastTime = useRef<number | null>(null);

  const clearCanvas = () =>
    ctx.current?.clearRect(
      0,
      0,
      canvasRef.current?.width ?? 0,
      canvasRef.current?.height ?? 0,
    );

  const renderFrame = (delta: number) => {
    clearCanvas();

    if (!ctx.current) return;
    catPawRenderer.current.renderFrame(ctx.current, delta);
  };

  const tick = (time: number) => {
    if (!canvasRef.current) return;
    const delta = time - (lastTime.current ?? time);
    lastTime.current = time;
    renderFrame(delta * 0.0012);
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    ctx.current = canvasRef.current?.getContext("2d") ?? null;
    catPawRenderer.current.loadImages();
    requestAnimationFrame(tick);
  }, []);

  const addCatPaw = ({
    nativeEvent: { clientX, clientY, target },
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!width || !height) return;
    const screenSize = new Vec2(width, height);
    const targetPos = new Vec2(clientX, clientY);
    const rect = (target as HTMLElement).getBoundingClientRect();
    const offset = new Vec2(rect.left, rect.top);
    const relativePos = Vec2.sub(targetPos, offset);
    catPawRenderer.current.addCatPaw(new CatPaw(screenSize, relativePos));
  };

  return (
    <canvas onClick={addCatPaw} ref={canvasRef} height={height} width={width} />
  );
};
