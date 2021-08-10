import React, { useEffect } from "react";
const Line = (props: any) => {
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
  useEffect(() => {
    if (turn === "line") {
      draw();
    }
    //处理异步数据
  }, [state]);
  function draw() {
    changeTurn("line");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderX1, sliderY1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderX1, -sliderY1);
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
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.globalCompositeOperation = operation;
    ctx.setLineDash([lineDashx, lineDashy]);
    ctx.lineDashOffset = lineDashOffset;
    ctx.beginPath();
    ctx.lineTo(sliderX1 * scaleAll, sliderY1 * scaleAll);
    ctx.lineTo(sliderX1 * scaleAll, (100 + sliderY1) * scaleAll);
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
