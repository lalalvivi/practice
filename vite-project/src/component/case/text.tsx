import React, { useContext, useEffect, useState, useCallback } from "react";
interface childProps {
  canvasAll: React.RefObject<HTMLCanvasElement>;
  rotate: number;
  globalAlpha: number;
  color: string;
  colors: string | undefined;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
  shadowColor: string;
  operation: string;
  sliderx1: number;
  slidery1: number;
  scaleAll: number;
  turn: string;
  changeTurn: Function;
  ctx: any;
  textContent: string | undefined;
  changeTextContent: Function;
  fontSize: number;
  direction: string;
  textAlign: string;
  textBaseline: string;
  fontFamily: string;
}
const TextContent: React.FC<childProps> = (props) => {
  const {
    fontSize,
    fontFamily,
    direction,
    textAlign,
    textBaseline,
    turn,
    textContent,
    changeTextContent,
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
    operation,
    sliderx1,
    slidery1,
    scaleAll,
  } = props;
  useEffect(() => {
    if (turn === "text") {
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
    turn,
    changeTextContent,
    changeTurn,
    ctx,
    fontSize,
    direction,
    textAlign,
    fontFamily,
    textBaseline,
    canvasAll,
    shadowBlur,
    shadowOffsetY,
    shadowColor,
    shadowOffsetX,
  ]);
  function draw() {
    changeTurn("text");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(sliderx1, slidery1);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-sliderx1, -slidery1);
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
    ctx.fillText(textContent, sliderx1, slidery1);
    ctx.restore();
  }
  return (
    <div>
      
      <input
        type="text"
        id="text"
        placeholder="输入文字"
        value={textContent}
        onChange={(e) => changeTextContent(e.target.value)}
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
