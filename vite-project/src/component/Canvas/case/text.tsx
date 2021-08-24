import React, { useEffect } from "react";
const TextContent = (props: any) => {
  const { ctx, canvasAll, state, txState, turn, changeTurn, textDispatch } =
    props;
  const {
    rotate,
    globalAlpha,
    color,
    colors,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
    operation,
    sliderX1,
    sliderY1,
    scaleAll,
  } = state;
  const {
    fontSize,
    fontFamily,
    direction,
    textAlign,
    textBaseline,
    textContent,
  } = txState;
  useEffect(() => {
    if (turn === "text") {
      draw();
    }
    //处理异步数据
  }, [state, txState]);
  function draw() {
    changeTurn("text");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderX1, sliderY1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderX1, -sliderY1);
    ctx.globalAlpha = globalAlpha;
    ctx.fillStyle = color;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.font = fontSize * scaleAll + "px" + " " + fontFamily;
    ctx.direction = direction;
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
    ctx.globalCompositeOperation = operation;
    ctx.fillText(textContent, sliderX1, sliderY1);
    ctx.restore();
  }
  return (
    <div>
      <input
        type="text"
        placeholder="输入文字"
        value={textContent}
        onChange={(e) =>
          textDispatch({ type: "textContent", textContent: e.target.value })
        }
      ></input>
      <div>
        <button type="button" onClick={draw}>
          添加文字
        </button>
      </div>
    </div>
  );
};
export default TextContent;
