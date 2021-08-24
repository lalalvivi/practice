import { endianness } from "os";
import React, { useEffect, useMemo } from "react";
import { parametric } from "../../tool/parametric";
const Triangulations = (props: any) => {
  const { ctx, canvasAll, turn, changeTurn } = props;

  useMemo(() => {
    if (turn === "tri") {
      // end();
    }
    //处理异步数据
  }, [turn]);
  const vertices = [
    [-0.7, 0.5],
    [-0.4, 0.3],
    [-0.25, 0.71],
    [-0.1, 0.56],
    [-0.1, 0.13],
    [0.4, 0.21],
    [0, -0.6],
    [-0.3, -0.3],
    [-0.6, -0.3],
    [-0.45, 0.0],
  ];
  let canvas: any = canvasAll.current;
  const poitions = vertices.map(([x, y]) => [x * 256, y * 256]);
  function start() {
    changeTurn("tri");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(0.5 * canvas.width, 0.5 * canvas.height);
    ctx.scale(1, -1);
    draw(ctx, poitions, "transparent", "red");
    draw(
      ctx,
      [
        [100, 100],
        [100, 200],
        [150, 200],
      ],
      "transparent",
      "blue"
    );
    canvas.addEventListener("mousemove", tri);
  }
  function tri(evt: any) {
    const { left, top } = canvas.getBoundingClientRect();
    const { x, y } = evt;
    // 坐标转换
    const offsetX = x - left;
    const offsetY = y - top;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isPointInPath(ctx, offsetX, offsetY)) {
      draw(ctx, poitions, "transparent", "green");
      draw(
        ctx,
        [
          [100, 100],
          [100, 200],
          [150, 200],
        ],
        "transparent",
        "orange"
      );
    } else {
      draw(ctx, poitions, "transparent", "red");
      draw(
        ctx,
        [
          [100, 100],
          [100, 200],
          [150, 200],
        ],
        "transparent",
        "blue"
      );
    }
  }
  function end() {
    canvas.removeEventListener("mousemove", tri);
  }
  function draw(
    ctx: any,
    points: any,
    strokeStyle?: string,
    fillStyle?: string
  ) {
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(...points[i]);
    }
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    ctx.stroke();
  }

  function isPointInPath(ctx: any, x: any, y: any) {
    const cloned = ctx.canvas.cloneNode().getContext("2d");
    console.log(cloned);

    cloned.translate(0.5 * canvas.width, 0.5 * canvas.height);
    cloned.scale(1, -1);
    let ret = 0;
    draw(cloned, poitions, "transparent", "red");
    ret |= cloned.isPointInPath(x, y);
    if (!ret) {
      draw(
        cloned,
        [
          [100, 100],
          [100, 200],
          [150, 200],
        ],
        "transparent",
        "blue"
      );
      ret |= cloned.isPointInPath(x, y);
    }
    return ret;
  }
  return (
    <div>
      <button type="button" onClick={start}>
        三角剖分
      </button>
    </div>
  );
};
export default Triangulations;
