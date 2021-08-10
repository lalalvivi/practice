import React from "react";
const LineStyle = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div>
      <span>线条宽度：</span>
      <input
        value={state.lineWidth}
        type="number"
        onChange={(e) =>
          dispatch({ type: "lineWidth", lineWidth: Number(e.target.value) })
        }
        min="0.1"
        max="10"
      />
      <span>线条末端样式：</span>
      <select
        value={state.lineCap}
        onChange={(e) => dispatch({ type: "lineCap", lineCap: e.target.value })}
      >
        <option value="butt">默认</option>
        <option value="round">圆形 </option>
        <option value="square">方形</option>
      </select>
      <span>线条间接合处：</span>
      <select
        value={state.lineJoin}
        onChange={(e) =>
          dispatch({ type: "lineJoin", lineJoin: e.target.value })
        }
      >
        <option value="round">磨圆</option>
        <option value="bevel">磨平 </option>
        <option value="miter">尖角</option>
      </select>
    </div>
  );
};
export default LineStyle;
