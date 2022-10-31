import React, { useCallback, useEffect, useRef, useState } from "react";
import { CatCanvas } from "./CatCanvas";

const RoundButtonStyles: React.CSSProperties = {
  border: "none",
  borderRadius: "50%",
  backgroundColor: "#545454",
  color: "white",
  fontSize: "30px",
  width: "50px",
  height: "50px",
  marginLeft: "-25px",
  paddingBottom: "5px",
  zIndex: 2,
  position: "absolute",
  bottom: "10px",
  left: "50%",
};

const CanvasContainerStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const TIMES_SIGN = "×";

const CatPaws = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(container.current?.clientWidth);
  const [height, setHeight] = useState(container.current?.clientHeight);

  const handleResize = useCallback(() => {
    if (!container.current) return;
    setWidth(container.current.clientWidth);
    setHeight(container.current.clientHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, [container]);

  return (
    <div style={CanvasContainerStyles} ref={container}>
      <CatCanvas width={width} height={height} />
      <button style={RoundButtonStyles} onClick={() => console.log("close")}>
        {TIMES_SIGN}
      </button>
    </div>
  );
};

export default CatPaws;