import React from "react";
const Scale = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div className="slider">
      <span>缩放：</span>
      <input
        type="range"
        value={state.scaleAll}
        min="0"
        max="2"
        onChange={(e) =>
          dispatch({ type: "scale", scaleAll: Number(e.target.value) })
        }
        step="0.1"
      />
    </div>
  );
};
export default Scale;
