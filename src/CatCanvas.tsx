import React, { forwardRef, LegacyRef } from "react";

type CatCanvasProps = {
  height?: number;
  width?: number;
}

export const CatCanvas = forwardRef(({ height, width }: CatCanvasProps, ref: LegacyRef<HTMLCanvasElement> | undefined) => {
  return (
    <canvas ref={ref} height={height} width={width} />
  )
});