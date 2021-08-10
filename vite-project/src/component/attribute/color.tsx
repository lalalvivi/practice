import React from "react";
const Color = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div>
      <span>颜色：</span>
      <input
        value={state.color}
        type="text"
        onChange={(e) => dispatch({ type: "color", color: e.target.value })}
      />
      <span>渐变颜色：</span>
      <input
        value={state.colors}
        type="text"
        onChange={(e) => dispatch({ type: "colors", colors: e.target.value })}
      />
    </div>
  );
};
export default Color;
