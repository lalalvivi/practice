import React from "react";
import { drawBorder } from "../control/imgRender";
const ClearAll = (props: any) => {
  const { dispatch, textDispatch, imgDispatch, changeTurn, canvasAll, ctx } =
    props;
  function clear() {
    changeTurn("black");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          clear();
          dispatch({ type: "clear" }),
            textDispatch({ type: "clear" }),
            imgDispatch({ type: "clear" });
        }}
      >
        清除画布
      </button>
    </div>
  );
};
export default ClearAll;
