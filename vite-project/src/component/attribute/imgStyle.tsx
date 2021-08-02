import React from 'react';
interface childProps{
  scaleSlider:number,
  changeScaleSlider:Function,
  sliderx:number,
  changeSliderx:Function,
  slidery:number,
  changeSlidery:Function,
  }
const  ImgStyle:React.FC<childProps>=(props)=> {
    const {scaleSlider,changeScaleSlider,sliderx,changeSliderx,slidery,changeSlidery}=props;
    return (
        <div>
         <div>图片缩放</div>
        <input
          type="range"
          min="0.1"
          max="2"
          value={scaleSlider}
          onChange={(e) => {
            {
              changeScaleSlider(Number(e.target.value));
            }
          }}
          step="0.1"
        />
        <div>切片x</div>
        <input
          type="range"
          min="0"
          max="600"
          value={sliderx}
          onChange={(e) => {
            {
              changeSliderx(Number(e.target.value));
            }
          }}
          step="0.1"
        />
        <div>切片y</div>
        <input
          type="range"
          min="0"
          max="600"
          value={slidery}
          onChange={(e) => {
            {
              changeSlidery(Number(e.target.value));
            }
          }}
          step="0.1"
        />
        </div>
    )
}
export default ImgStyle;