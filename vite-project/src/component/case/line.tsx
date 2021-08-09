import React, { useEffect } from "react";
import { childProps } from "./receive";
const Line: React.FC<childProps> = (props) => {
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
    if (turn === "line") {
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
    changeTurn("line");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderx1, slidery1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderx1, -slidery1);
    var grad = ctx.createLinearGradient(0, 0, 500, 500);
    if (colors) {
      let colors1 = colors.split("-");
      let a = 0;
      for (let i = 0; i < colors1.length; i++) {
        grad.addColorStop(a, colors1[i]);
        a = a + 0.5;
      }
      ctx.strokeStyle = grad;
    } else {
      ctx.strokeStyle = color;
    }
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
    ctx.lineTo(sliderx1 * scaleAll, slidery1 * scaleAll);
    ctx.lineTo(sliderx1 * scaleAll, (100 + slidery1) * scaleAll);
    ctx.stroke();
    ctx.restore();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制直线
      </button>
    </div>
  );
};
export default Line;
