import React, { useEffect, useState } from "react";
import { childProps } from "./receive";
const Arc: React.FC<childProps> = (props) => {
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
  const [left, setLeft] = useState<number>(200);
  const [top, setTop] = useState<number>(200);
  useEffect(() => {
    if (turn === "arc") {
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
    changeTurn("arc");
    let canvas: any = canvasAll.current;
    var sr = 50 * scaleAll;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(left + sr / 2, top + sr / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-left - sr / 2, -top - sr / 2);
    ctx.globalAlpha = globalAlpha;
    ctx.lineWidth = linewidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.lineWidth = linewidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.globalCompositeOperation = operation;
    ctx.setLineDash([lineDashx, lineDashy]);
    ctx.lineDashOffset = lineDashOffset;
    ctx.beginPath();
    ctx.arc(sliderx1, slidery1, sr, 0, Math.PI + Math.PI / 2, false);
    ctx.stroke();
    setLeft(sliderx1);
    setTop(slidery1);
    ctx.restore();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制圆弧
      </button>
    </div>
  );
};
export default Arc;
