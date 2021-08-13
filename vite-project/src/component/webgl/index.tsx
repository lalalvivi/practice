import React, { memo, useState, useCallback } from "react";
import AnimationDraw from "./animation";
import DrawShape from "./drawShape";
import MouseDraw from "./mouseDraw";
import "./webgl.less";
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
        <DrawShape
          drawN={drawN}
          changeDrawN={changeDrawN}
          canvasWebgl={canvasWebgl}
        />
      </div>
      <div className="right">
        <canvas
          ref={canvasWebgl}
          id="canvas1"
          width="1720"
          height="800"
        ></canvas>
      </div>
    </div>
  );
});
