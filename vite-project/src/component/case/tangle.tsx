import React, { useEffect, useReducer, useState } from "react";
const Tangle = (props: any) => {
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
    if (turn == "tangle") {
      draw();
    }
    //处理异步数据
  }, [state, turn]);
  function draw() {
    changeTurn("tangle");
    let canvas: any = canvasAll.current;
    var a = 50;
    var b = a + 25;
    var c = a - 25;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(left + (b - c) / 2, top + (b - c) / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-left - (b - c) / 2, -top - (b - c) / 2);
    ctx.globalAlpha = globalAlpha;
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
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.globalCompositeOperation = operation;
    ctx.setLineDash([lineDashx, lineDashy]);
    ctx.lineDashOffset = lineDashOffset;
    ctx.beginPath();
    ctx.moveTo(a * scaleAll + left, a * scaleAll + top);
    ctx.lineTo(b * scaleAll + left, b * scaleAll + top);
    ctx.lineTo(c * scaleAll + left, b * scaleAll + top);
    ctx.closePath();
    ctx.stroke();
    setLeft(sliderX1);
    setTop(sliderY1);
    ctx.restore();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制三角形
      </button>
    </div>
  );
};
export default Tangle;
