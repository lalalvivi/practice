import React, { useEffect } from "react";
import { parametric } from "../../tool/parametric";
const Oval = (props: any) => {
  const { ctx, canvasAll, turn, changeTurn } = props;

  useEffect(() => {
    if (turn === "oval") {
      draw();
    }
    //处理异步数据
  }, [ctx]);
  function draw() {
    changeTurn("oval");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, 100);
    const para = parametric(
      (t: number, a: number, b: number) => a * Math.cos(t),
      (t: number, a: number, b: number) => b * Math.sin(t)
    );
    para(0, Math.PI * 2, 20, 30, 20, 30).draw(ctx);
    ctx.translate(-canvas.width / 2, -100);
  }
  return (
    <div>
      <button type="button" onClick={draw}>
        绘制椭圆
      </button>
    </div>
  );
};
export default Oval;
