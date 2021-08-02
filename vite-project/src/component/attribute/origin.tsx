import React from 'react';
interface childProps{
  sliderx1:number,
  changeSliderx1:Function,
  slidery1:number,
  changeSlidery1:Function,
}
const  Origin:React.FC<childProps>=(props)=> {
    const {sliderx1,changeSliderx1,slidery1,changeSlidery1}=props;
    return (
        <div>
          <div>原点坐标x</div>
        <input
          type="range"
          min="-800"
          max="800"
          value={sliderx1}
          onChange={(e) => {
            {
              changeSliderx1(Number(e.target.value));
            }
          }}
          step="0.1"
        />
        <div>原点坐标y</div>
        <input
          type="range"
          min="-800"
          max="800"
          value={slidery1}
          onChange={(e) => {
            {
              changeSlidery1(Number(e.target.value));
            }
          }}
          step="0.1"
        />
        </div>
    )
}
export default Origin;