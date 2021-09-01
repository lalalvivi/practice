import React, { useEffect, useMemo } from "react";
const ChooseColor = (props: any) => {
  const {
    changeActive,
    active,
    ctx,
    dispatch,
    canvasAll,
    selectedColor,
    state,
  } = props;
  useEffect(() => {
    //处理异步数据
    choose();
  }, [active]);
  function choose() {
    if (active) {
      function pick(event: any, destination: any) {
        var x = event.layerX;
        var y = event.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${
          data[3] / 255
        })`;
        // selectedColor.current.style.backgroundColor = rgba;

        return rgba;
      }
      function select(event: any) {
        let color = pick(event, selectedColor.current);
        // state.color = color;
        dispatch({ type: "color", color: color });
      }
      let canvas: any = canvasAll.current;
      let selectedColor: any = canvasAll.current;
      canvas.addEventListener("mousemove", select, false);
      canvas.addEventListener("click", function (event: any) {
        canvas.removeEventListener("mousemove", select, false);
        pick(event, selectedColor.current);
        changeActive(false);
      });
    }
  }

  return (
    <div>
      <button
        className="chooseColor"
        type="button"
        onClick={() => {
          changeActive(true);
        }}
      >
        吸色
      </button>
    </div>
  );
};
export default ChooseColor;
