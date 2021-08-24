import React from "react";
const ImgStyle = (props: any) => {
  const { imgDispatch, imageState } = props;
  return (
    <div>
      <div>图片缩放</div>
      <input
        value={imageState.scaleSlider}
        type="range"
        min="0.1"
        max="2"
        onChange={(e) => {
          {
            imgDispatch({
              type: "scaleSlider",
              scaleSlider: Number(e.target.value),
            });
          }
        }}
        step="0.1"
      />
      <div>切片x</div>
      <input
        value={imageState.sliderX}
        type="range"
        min="0"
        max="600"
        onChange={(e) => {
          {
            imgDispatch({ type: "sliderX", sliderX: Number(e.target.value) });
          }
        }}
        step="0.1"
      />
      <div>切片y</div>
      <input
        value={imageState.sliderY}
        type="range"
        min="0"
        max="600"
        onChange={(e) => {
          {
            imgDispatch({ type: "sliderY", sliderY: Number(e.target.value) });
          }
        }}
        step="0.1"
      />
    </div>
  );
};
export default ImgStyle;
