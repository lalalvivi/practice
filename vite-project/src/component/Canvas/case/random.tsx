import React, { useEffect } from "react";
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
  function draw() {
    changeTurn("random");
    let canvas: any = canvasAll.current;
    let w = canvas.width,
      h = canvas.height,
      posX,
      posY,
      speedX,
      speedY,
      triangleCur;
    function randomNum(m: number, n: number) {
      return Math.floor(Math.random() * (n - m + 1) + m);
    }
    let shapes = createCache();
    let shape = shapes[0];

    var triangles: any[] = [];
    function getTriangle() {
      let rad = Math.random() * Math.PI * 2;
      let u_dir = [Math.cos(rad), Math.sin(rad)];
      for (let n = 0; n < 1; n++) {
        (posX = randomNum(w / 2 - 5, w / 2 + 5)),
          (posY = randomNum(h / 2 - 5, h / 2 + 5)),
          (speedX = u_dir[0]),
          (speedY = u_dir[1]);
        let triangle = {
          posX: posX,
          posY: posY,
          speedX: speedX,
          speedY: speedY,
        };
        if (triangle.speedX || triangle.speedY) {
          triangles.push(triangle);
        }
      }
    }

    function move() {
      ctx.clearRect(0, 0, canvas.width * 4, canvas.height * 4);
      getTriangle();
      var l = triangles.length;
      for (var i = 0; i < l; i++) {
        let rad = Math.random() * Math.PI * 2;
        let cosAngle = Math.cos(rad);
        let sinAngle = Math.sin(rad);
        triangleCur = triangles[i];
        if (triangleCur.posX < canvas.width) {
          triangleCur.posX += triangleCur.speedX;
          triangleCur.posY += triangleCur.speedY;
        }
        // console.log(triangleCur.speedX);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.transform(cosAngle, sinAngle, -sinAngle, cosAngle, 0, 0);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        if (
          triangleCur.posX < canvas.width &&
          triangleCur.posX > 0 &&
          triangleCur.posY < canvas.height &&
          triangleCur.posY > 0
        ) {
          ctx.drawImage(shape, triangleCur.posX, triangleCur.posY);
        }

        ctx.restore();
      }
      setInterval(move, 0.01);
      // requestAnimationFrame(move);
    }
    move();
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
