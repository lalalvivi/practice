import React, { memo, useState, useCallback } from "react";
import AnimationDraw from "./animation";
import Combine from "./combine";
import DrawShape from "./drawShape";
import DrawType from "./drawType";
import Grad from "./grad";
import MouseDraw from "./mouseDraw";
import Progress from "./progress";
import "./webgl.scss";
export default memo(function Webgl() {
  const canvasWebgl = React.useRef<HTMLCanvasElement>(null);
  const [drawN, setDrawN] = useState<number>(3);
  const changeDrawN = useCallback((code: number) => {
    setDrawN(code);
  }, []);
  return (
    <div className="all">
      <div className="left">
        <MouseDraw canvasWebgl={canvasWebgl}></MouseDraw>
        <AnimationDraw canvasWebgl={canvasWebgl}></AnimationDraw>
        <Combine canvasWebgl={canvasWebgl}></Combine>
        <Progress canvasWebgl={canvasWebgl}></Progress>
        <Grad canvasWebgl={canvasWebgl}></Grad>
        <DrawShape
          drawN={drawN}
          changeDrawN={changeDrawN}
          canvasWebgl={canvasWebgl}
        />
        <DrawType canvasWebgl={canvasWebgl}></DrawType>
      </div>
      <div className="right">
        <canvas
          ref={canvasWebgl}
          id="canvas1"
          width="800"
          height="800"
        ></canvas>
      </div>
    </div>
  );
});
