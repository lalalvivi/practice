import React from "react";
const Alpha = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div>
      <span>透明度：</span>
      <input
        value={state.alpha}
        type="range"
        min="0"
        max="1"
        onChange={(e) =>
          dispatch({ type: "alpha", operation: Number(e.target.value) })
        }
        step="0.1"
      />
    </div>
  );
};
export default Alpha;
