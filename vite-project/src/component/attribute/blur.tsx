import React from 'react';
interface childProps{
  shadowBlur:number,
  changeShadowBlur:Function,
  shadowColor:string,
  changeShadowColor:Function,
  shadowOffsetX:number,
  changeShadowOffsetX:Function,
  shadowOffsetY:number,
  changeShadowOffsetY:Function,
}
const  Blur:React.FC<childProps>=(props)=> {
    const {shadowBlur,changeShadowBlur,shadowColor,changeShadowColor,shadowOffsetX,changeShadowOffsetX,shadowOffsetY,changeShadowOffsetY}=props;
    return (
        <div>
            <span>阴影模糊：</span>
          <input
            type="number"
            value={shadowBlur}
            onChange={(e) => changeShadowBlur(Number(e.target.value))}
            min="0"
            max="10"
          />
          <span>阴影颜色：</span>
          <input
            type="text"
            value={shadowColor}
            onChange={(e) => changeShadowColor(e.target.value)}
          />
          <span>阴影偏移x：</span>
          <input
            type="number"
            value={shadowOffsetX}
            onChange={(e) => changeShadowOffsetX(Number(e.target.value))}
            min="0"
            max="10"
          />
          <span>阴影偏移y：</span>
          <input
            type="number"
            value={shadowOffsetY}
            onChange={(e) => changeShadowOffsetY(Number(e.target.value))}
            min="0"
            max="10"
          />
        </div>
    )
}
export default Blur;