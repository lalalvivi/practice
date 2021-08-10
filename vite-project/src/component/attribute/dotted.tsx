import React from "react";
const Dotted = (props: any) => {
  const { dispatch, state } = props;
  return (
    <div>
      <span>虚线中实线长度：</span>
      <input
        value={state.lineDashx}
        type="number"
        onChange={(e) =>
          dispatch({ type: "lineDashx", lineDashx: Number(e.target.value) })
        }
      />
      <span>虚线中空白长度：</span>
      <input
        value={state.lineDashy}
        type="number"
        onChange={(e) =>
          dispatch({ type: "lineDashy", lineDashy: Number(e.target.value) })
        }
      />
      <span>虚线中起始偏移：</span>
      <input
        value={state.lineDashOffset}
        type="number"
        onChange={(e) =>
          dispatch({
            type: "lineDashOffset",
            lineDashOffset: Number(e.target.value),
          })
        }
      />
    </div>
  );
};
export default Dotted;
