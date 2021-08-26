import React from "react";
const Rotate = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div className="slider">
      <span>旋转：</span>
      <input
        value={state.rotate}
        type="range"
        min="0"
        max="360"
        onChange={(e) =>
          dispatch({ type: "rotate", rotate: Number(e.target.value) })
        }
        step="1"
      />
    </div>
  );
};
export default Rotate;
