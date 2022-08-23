import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { CatCanvas } from "./CatCanvas";

const RoundButton = styled.button`; 
  border: none;
  border-radius: 50%;
  background-color: #545454;
  color: white;
  font-size: 30px;
  width: 50px;
  height: 50px;
  margin-left: -25px;
  padding-bottom: 5px;
  z-index: 2;
  position: absolute;
  bottom: 10px;
  left: 50%;
`

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TIMES_SIGN = "×";

const CatContainer = () => {
  const container = useRef<HTMLDivElement|null>(null);
  const [width, setWidth] = useState(container.current?.clientWidth);
  const [height, setHeight] = useState(container.current?.clientHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(container.current?.clientWidth);
      setHeight(container.current?.clientHeight);
    }
    container.current?.addEventListener("resize", handleResize);
  })
  
  return (
    <CanvasContainer ref={container}>
      <CatCanvas width={width} height={height}/>
      <RoundButton onClick={() => console.log("close")}>{TIMES_SIGN}</RoundButton>
    </CanvasContainer>
  )
}

export const CatPaws = () => {
  return (<CatContainer/>);
}