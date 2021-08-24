import React from "react";
const Blur = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div>
      <span>阴影模糊：</span>
      <input
        type="number"
        value={state.shadowBlur}
        onChange={(e) =>
          dispatch({ type: "shadowBlur", shadowBlur: Number(e.target.value) })
        }
        min="0"
        max="10"
      />
      <span>阴影颜色：</span>
      <input
        value={state.shadowColor}
        type="text"
        onChange={(e) =>
          dispatch({ type: "shadowColor", shadowColor: e.target.value })
        }
      />
      <span>阴影偏移x：</span>
      <input
        value={state.shadowOffsetX}
        type="number"
        onChange={(e) =>
          dispatch({
            type: "shadowOffsetX",
            shadowOffsetX: Number(e.target.value),
          })
        }
        min="0"
        max="10"
      />
      <span>阴影偏移y：</span>
      <input
        value={state.shadowOffsetY}
        type="number"
        onChange={(e) =>
          dispatch({
            type: "shadowOffsetY",
            shadowOffsetY: Number(e.target.value),
          })
        }
        min="0"
        max="10"
      />
    </div>
  );
};
export default Blur;
