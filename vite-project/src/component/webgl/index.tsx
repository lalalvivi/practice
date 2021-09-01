import React, { memo, useState, useCallback } from "react";
import AnimationDraw from "./animation";
import Combine from "./combine";
import DrawLine from "./drawLine";
import DrawShape from "./drawShape";
import DrawType from "./drawType";
import Grad from "./grad";
import Irregular from "./irregular";
import MouseDraw from "./mouseDraw";
import NewRandom from "./newRandom";
import Progress from "./progress";
import Random from "./radom";
import "./webgl.scss";
export default memo(function Webgl() {
  const canvasWebgl = React.useRef<HTMLCanvasElement>(null);
  const [drawN, setDrawN] = useState<number>(3);
  const [thickness, setThickness] = useState<number>(3);
  const [type, setType] = useState<string>("椭圆");
  const [point, setPoint] = useState<string>(
    "100, 100, 100, 200, 200, 150, 300, 200, 300, 100"
  );
  const changePoint = useCallback((code: string) => {
    setPoint(code);
  }, []);
  const changeType = useCallback((code: string) => {
    setType(code);
  }, []);
  const changeDrawN = useCallback((code: number) => {
    setDrawN(code);
  }, []);
  const changeThickness = useCallback((code: number) => {
    setThickness(code);
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
        <DrawType
          type={type}
          changeType={changeType}
          canvasWebgl={canvasWebgl}
        ></DrawType>
        <Irregular canvasWebgl={canvasWebgl}></Irregular>
        <DrawLine
          canvasWebgl={canvasWebgl}
          point={point}
          changePoint={changePoint}
          thickness={thickness}
          changeThickness={changeThickness}
        ></DrawLine>
        <Random canvasWebgl={canvasWebgl}></Random>
        <NewRandom canvasWebgl={canvasWebgl}></NewRandom>
      </div>
      <div className="right">
        <canvas
          className="canvas"
          ref={canvasWebgl}
          width="800"
          height="800"
        ></canvas>
      </div>
    </div>
  );
});
