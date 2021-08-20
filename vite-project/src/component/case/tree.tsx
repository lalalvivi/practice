import React, { useEffect, useMemo, useState } from "react";
import { Vector2D } from "../tool/vector2D";
const Tree = (props: any) => {
  const { ctx, canvasAll, turn, changeTurn } = props;
  function draw() {
    let p1 = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        console.log(4723940);
        resolve("成功");
      }, 1001);
    });
    let p = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        let a = Math.random() * 10;
        if (a > 5) {
          resolve(a);
        } else {
          reject("数字太小");
        }
      }, 1000);
    });
    p.then((result) => {
      console.log("resolved", result);
    }).catch((err) => {
      console.log("rejected", err);
    });
    let b = Promise.race([p, p1]);
    b.then((result) => {
      console.log("resolved", result);
    }).catch((err) => {
      console.log("rejected", err);
    });
    changeTurn("tree");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(0, canvas.height / 2);
    ctx.scale(1, -1);
    ctx.lineCap = "round";
    const v0 = new Vector2D(256, 0);
    drawBranch(ctx, v0, 50, 10, 1, 3);
    ctx.restore();
  }
  function drawBranch(
    context: any,
    v0: any,
    length: number,
    thickness: number,
    dir: number,
    bias: number
  ) {
    const v = new Vector2D().rotate(dir).scale(length);
    const v1 = v0.copy().add(v);
    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(...v0);
    context.lineTo(...v1);
    context.stroke();
    if (thickness > 2) {
      const left =
        Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
      drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
      const right =
        Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
      drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
    }
    if (thickness < 5 && Math.random() < 0.3) {
      context.save();
      context.strokeStyle = "#c72c35";
      const th = Math.random() * 6 + 3;
      context.lineWidth = th;
      context.beginPath();
      context.moveTo(...v1);
      context.lineTo(v1.x, v1.y - 2);
      context.stroke();
      context.restore();
    }
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制树
      </button>
    </div>
  );
};
export default Tree;
