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
  const shapeTypes = [3, 4, 5, 6, -1];
  const TAU = Math.PI * 2;
  const shapes = createCache();
  function randomTriangle() {
    const u_rotation = Math.random() * Math.PI; // 初始旋转角度
    const u_time = 0;
    const u_duration = 5.0;
    const rad = Math.random() * Math.PI * 2;
    const u_dir = [Math.cos(rad), Math.sin(rad)];
    const startTime = performance.now();
    const u_scale = Math.random() * 0.05 + 0.5;
    return {
      u_rotation,
      u_scale,
      u_time,
      u_duration,
      u_dir,
      startTime,
    };
  }

  function draw() {
    changeTurn("random");
    let canvas: any = canvasAll.current;
    const shape = shapes[0];
    let triangle = {
      x: canvas.width / 2 - 5,
      y: canvas.height / 2 - 5,
      draw: function (tri: any) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        let p = Math.min(1.0, tri.u_time / tri.u_duration);
        let rad = tri.u_rotation + 3.14 * 10.0 * p;
        let cosAngle = Math.cos(rad);
        let sinAngle = Math.sin(rad);
        triangle.x += 2 * tri.u_dir[0] * p * p;
        triangle.y += 2 * tri.u_dir[1] * p * p;
        ctx.transform(
          tri.u_scale * cosAngle,
          tri.u_scale * sinAngle,
          -tri.u_scale * sinAngle,
          tri.u_scale * cosAngle,
          2 * tri.u_dir[0] * p * p,
          2 * tri.u_dir[1] * p * p
        );
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        ctx.drawImage(shape, triangle.x, triangle.y);
        ctx.restore();
      },
    };
    let triangles: any = [];
    function tick() {
      for (let i = 0; i < 5; i++) {
        triangles.push(randomTriangle());
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triangles.forEach((tri: any) => {
        tri.u_time = (performance.now() - tri.startTime) / 1000;
        function move() {
          if (
            triangle.x - 10 > canvas.width ||
            triangle.y - 10 > canvas.height
          ) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            triangle.x = canvas.width / 2;
            triangle.y = canvas.height / 2;
          }
          triangle.draw(tri);
          console.log(tri);
        }
        move();
      });

      triangles = triangles.filter((tri: any) => {
        return tri.u_time <= tri.u_duration;
      });
      requestAnimationFrame(tick);
    }
    tick();
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
  function createCache() {
    const ret = [];
    for (let i = 0; i < shapeTypes.length; i++) {
      const cacheCanvas = new OffscreenCanvas(40, 40);
      const type = shapeTypes[i];
      const context: any = cacheCanvas.getContext("2d");
      context.fillStyle = "red";
      context.strokeStyle = "black";
      if (type > 0) {
        const points = regularShape(20, 20, 10, type);
        drawShape(context, points);
      } else {
        context.beginPath();
        context.arc(10, 10, 10, 0, TAU);
        context.stroke();
        context.fill();
      }
      ret.push(cacheCanvas);
    }
    return ret;
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
