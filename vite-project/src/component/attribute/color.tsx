import React from 'react';
interface childProps{
    color:string,
    changeColor:Function,
    colors:string|undefined,
    changeColors:Function,
}
const  Color:React.FC<childProps>=(props)=> {
    const {color,changeColor,colors,changeColors}=props;
    return (
        <div>
            <span>颜色：</span>
            <input
          type="text"
          value={color}
          onChange={(e) => changeColor(e.target.value)}
        />
         <span>渐变颜色：</span>
          <input
            type="text"
            value={colors}
            onChange={(e) => changeColors(e.target.value)}
          />
        </div>
    )
}
export default Color;