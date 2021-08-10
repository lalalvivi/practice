import React, { useEffect, useState, useCallback, useReducer } from "react";
const Rect = (props: any) => {
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
    if (turn == "rect") {
      draw();
    }
    //处理异步数据
  }, [state]);
  function draw() {
    changeTurn("rect");
    let canvas: any = canvasAll.current;
    var sw = 100 * scaleAll;
    var sh = 100 * scaleAll;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(left + sw / 2, top + sh / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-left - sw / 2, -top - sh / 2);
    ctx.globalAlpha = globalAlpha;
    var grad = ctx.createLinearGradient(0, 0, 500, 500);
    if (colors) {
      let colors1 = colors.split("-");
      let a = 0;
      if (colors1.length > 1) {
        for (let i = 0; i < colors1.length; i++) {
          grad.addColorStop(a, colors1[i]);
          a = a + 0.5;
        }
        ctx.strokeStyle = grad;
      } else {
        ctx.strokeStyle = color;
      }
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
    ctx.strokeRect(sliderX1, sliderY1, sw, sh);
    setLeft(sliderX1);
    setTop(sliderY1);
    ctx.restore();
    // MouseControl('rect',changeScale,changeLeft,changeTop,canvas,ctx,rotate,sw,sh,x,y,isTransparent);
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制矩形
      </button>
    </div>
  );
};
export default Rect;
