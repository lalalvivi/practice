import React from "react";
const Origin = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div>
      <div>原点坐标x</div>
      <input
        value={state.sliderX1}
        type="range"
        min="-800"
        max="800"
        onChange={(e) => {
          {
            dispatch({ type: "sliderX1", sliderX1: Number(e.target.value) });
          }
        }}
        step="0.1"
      />
      <div>原点坐标y</div>
      <input
        value={state.sliderY1}
        type="range"
        min="-800"
        max="800"
        onChange={(e) => {
          {
            dispatch({ type: "sliderY1", sliderY1: Number(e.target.value) });
          }
        }}
        step="0.1"
      />
    </div>
  );
};
export default Origin;
