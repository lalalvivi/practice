import React, { useEffect } from "react";
import { childProps } from "./receive";
const Quadratic = (props: any) => {
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
    if (turn === "quadratic") {
      draw();
    }
    //处理异步数据
  }, [state]);
  function draw() {
    changeTurn("quadratic");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderX1, sliderY1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderX1, -sliderY1);
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
    ctx.moveTo(sliderX1, sliderY1);
    ctx.quadraticCurveTo(
      50 * scaleAll,
      75 * scaleAll,
      100 * scaleAll,
      120 * scaleAll
    );
    ctx.stroke();
    ctx.restore();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制二次贝塞尔曲线
      </button>
    </div>
  );
};
export default Quadratic;
