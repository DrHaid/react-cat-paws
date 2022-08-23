import React, { useEffect, useRef } from "react";
import { CatCanvasProps } from "./types";

export const CatCanvas = ({ height, width }: CatCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);

  const renderFrame = () => {
    // ...
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestAnimationFrame(tick);
  }, []);
  
  return (
    <canvas ref={canvasRef} height={height} width={width} />
  )
};