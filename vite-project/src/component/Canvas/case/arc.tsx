import { Interface } from "node:readline";
import React, { useEffect, useState, useMemo } from "react";
import { childProps } from "./receive";
const Arc = (props: childProps) => {
  const { ctx, canvasAll, state, turn, changeTurn } = props;
  const {
    rotate,
    globalAlpha,
    color,
    colors,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
    lineWidth,
    lineJoin,
    lineCap,
    operation,
    lineDashx,
    lineDashy,
    lineDashOffset,
    sliderX1,
    sliderY1,
    scaleAll,
  } = state;
  const [left, setLeft] = useState<number>(200);
  const [top, setTop] = useState<number>(200);
  useEffect(() => {
    if (turn === "arc") {
      draw();
    }
    //处理异步数据
  }, [state]);
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
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    var grad = ctx.createLinearGradient(0, 0, 500, 500);
    if (colors) {
      let colors1 = colors.split("-");
      let a = 0;
      for (let i = 0; i < colors1.length; i++) {
        grad.addColorStop(a, colors1[i]);
        a = a + 1 / colors1.length;
      }
      ctx.strokeStyle = grad;
    } else {
      ctx.strokeStyle = color;
    }
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.globalCompositeOperation = operation;
    ctx.setLineDash([lineDashx, lineDashy]);
    ctx.lineDashOffset = lineDashOffset;
    ctx.beginPath();
    ctx.arc(sliderX1, sliderY1, sr, 0, Math.PI + Math.PI / 2, false);
    ctx.stroke();
    setLeft(sliderX1);
    setTop(sliderY1);
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
