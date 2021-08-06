import React, { useContext, useEffect, useState, useCallback } from "react";
import { childProps } from "./receive";
const Bezier: React.FC<childProps> = (props) => {
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
    if (turn === "bezier") {
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
    changeTurn("bezier");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderx1, slidery1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderx1, -slidery1);
    ctx.globalAlpha = globalAlpha;
    ctx.lineWidth = linewidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.globalCompositeOperation = operation;
    ctx.setLineDash([lineDashx, lineDashy]);
    ctx.lineDashOffset = lineDashOffset;
    ctx.beginPath();
    ctx.moveTo(sliderx1, slidery1);
    ctx.quadraticCurveTo(
      20 * scaleAll,
      35 * scaleAll,
      50 * scaleAll,
      70 * scaleAll,
      140 * scaleAll,
      160 * scaleAll
    );
    ctx.stroke();
    ctx.restore();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制三次贝塞尔曲线
      </button>
    </div>
  );
};
export default Bezier;
