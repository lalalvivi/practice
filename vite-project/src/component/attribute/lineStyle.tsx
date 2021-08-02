import React from 'react';
interface childProps{
  linewidth:number,
  changeLinewidth:Function,
  lineCap:string,
  changeLineCap:Function,
  lineJoin:string,
  changeLineJoin:Function,
}
const  LineStyle:React.FC<childProps>=(props)=> {
    const {linewidth,changeLinewidth,lineCap,changeLineCap,lineJoin,changeLineJoin}=props;
    return (
        <div>
          <span>线条宽度：</span>
          <input
            id="lineWidth"
            type="number"
            value={linewidth}
            onChange={(e) => changeLinewidth(Number(e.target.value))}
            min="0.1"
            max="10"
          />
          <span>线条末端样式：</span>
          <select
            value={lineCap}
            onChange={(e) => changeLineCap(e.target.value)}
          >
            <option value="butt">默认</option>
            <option value="round">圆形 </option>
            <option value="square">方形</option>
          </select>
          <span>线条间接合处：</span>
          <select
            value={lineJoin}
            onChange={(e) => changeLineJoin(e.target.value)}
          >
            <option value="round">磨圆</option>
            <option value="bevel">磨平 </option>
            <option value="miter">尖角</option>
          </select>
        </div>
    )
}
export default LineStyle;