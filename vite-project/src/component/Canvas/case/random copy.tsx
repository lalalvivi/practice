import React, { useEffect } from "react";
import { parametric } from "../../tool/parametric";
const Random = (props: any) => {
  const { ctx, canvasAll, turn, changeTurn } = props;

  useEffect(() => {
    if (turn === "random") {
      draw();
    }
    //处理异步数据
  }, [ctx]);
  const shapeTypes = [3, 4, 5, 6, 100];
  const COUNT = 1000;
  function draw() {
    changeTurn("random");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < COUNT; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const points = regularShape(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        10,
        type
      );
      drawShape(ctx, points);
    }
    requestAnimationFrame(draw);
  }
  function regularShape(x: number, y: number, r: number, edges = 3) {
    const points = [];
    const delta = (2 * Math.PI) / edges;
    for (let i = 0; i < edges; i++) {
      const theta = i * delta;
      points.push([x + r * Math.sin(theta), y + r * Math.cos(theta)]);
    }
    return points;
  }

  function drawShape(context: any, points: any) {
    context.fillStyle = "red";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
      context.lineTo(...points[i]);
    }
    context.closePath();
    context.stroke();
    context.fill();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制随机图形
      </button>
    </div>
  );
};
export default Random;
