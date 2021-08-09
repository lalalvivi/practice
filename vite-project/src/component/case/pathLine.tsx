import React, { useEffect } from "react";
import { childProps } from "./receive";
const PathLine: React.FC<childProps> = (props) => {
  const {
    turn,
    ctx,
    changeTurn,
    canvasAll,
    rotate,
    globalAlpha,
    color,
    colors,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
    linewidth,
    lineJoin,
    lineCap,
    operation,
    lineDashx,
    lineDashy,
    lineDashOffset,
    sliderx1,
    slidery1,
    scaleAll,
  } = props;
  useEffect(() => {
    if (turn === "pathLine") {
      draw();
    }
    //处理异步数据
  }, [
    scaleAll,
    sliderx1,
    slidery1,
    rotate,
    globalAlpha,
    operation,
    color,
    colors,
    lineDashx,
    lineDashOffset,
    linewidth,
    lineDashy,
    lineCap,
    lineJoin,
    turn,
    changeTurn,
    ctx,
    canvasAll,
    shadowBlur,
    shadowOffsetY,
    shadowColor,
    shadowOffsetX,
  ]);
  function draw() {
    changeTurn("pathLine");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderx1, slidery1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderx1, -slidery1);
    ctx.strokeStyle = color;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.globalAlpha = globalAlpha;
    ctx.lineWidth = linewidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.globalCompositeOperation = operation;
    ctx.setLineDash([lineDashx, lineDashy]);
    ctx.lineDashOffset = lineDashOffset;
    ctx.beginPath();
    ctx.moveTo(100 * scaleAll, 20 * scaleAll);
    ctx.lineTo(100 * scaleAll, (20 + 100) * scaleAll);
    ctx.lineTo((100 + 100) * scaleAll, (20 + 100) * scaleAll);
    ctx.lineTo((100 + 100) * scaleAll, 200 * scaleAll);
    ctx.stroke();
    ctx.restore();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制路径
      </button>
    </div>
  );
};
export default PathLine;
