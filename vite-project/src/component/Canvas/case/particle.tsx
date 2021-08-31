import React, { useEffect } from "react";
const Particles = (props: any) => {
  const { ctx, canvasAll, turn, changeTurn } = props;

  useEffect(() => {
    if (turn === "particle") {
      draw();
    }
    //处理异步数据
  }, [ctx]);

  function draw() {
    changeTurn("Particle");
    let canvas: any = canvasAll.current;
    let w = canvas.width,
      h = canvas.height,
      posX,
      posY,
      speedX,
      speedY,
      radius,
      startSpeedX: number,
      startSpeedY: number,
      fillColor,
      ballCur;
    function randomNum(m: number, n: number) {
      return Math.floor(Math.random() * (n - m + 1) + m);
    }

    var balls: any[] = [];
    function getBall() {
      const rad = Math.random() * Math.PI * 2;
      const u_dir = [Math.cos(rad), Math.sin(rad)];
      for (let n = 0; n < 1; n++) {
        (radius = randomNum(10, 20)),
          (posX = randomNum(w / 2 - radius, w / 2 + radius)),
          (posY = randomNum(h / 2 - radius, h / 2 + radius)),
          (speedX = u_dir[0]),
          (speedY = u_dir[1]),
          (startSpeedX = speedX),
          (startSpeedY = speedY);
        fillColor =
          "rgb(" +
          randomNum(0, 255) +
          "," +
          randomNum(0, 255) +
          "," +
          randomNum(0, 255) +
          ")";
        var ball = {
          radius: radius,
          posX: posX,
          posY: posY,
          speedX: speedX,
          speedY: speedY,
          startSpeedX: startSpeedX,
          startSpeedY: startSpeedX,
          fillColor: fillColor,
        };
        if (ball.speedX || ball.speedY) {
          balls.push(ball);
        }
      }
      requestAnimationFrame(getBall);
    }
    getBall();

    function draw1() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var l = balls.length;
      for (var i = 0; i < l; i++) {
        ctx.beginPath();
        ballCur = balls[i];
        ballCur.posX += ballCur.speedX;
        ballCur.posY += ballCur.speedY;
        ctx.arc(ballCur.posX, ballCur.posY, ballCur.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ballCur.fillColor;
        ctx.closePath();
        ctx.fill();
      }
      requestAnimationFrame(draw1);
    }
    draw1();
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制
      </button>
    </div>
  );
};
export default Particles;
