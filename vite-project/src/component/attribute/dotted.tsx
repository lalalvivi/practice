import React from 'react';
interface childProps{
  lineDashx:number,
  changeLineDashx:Function,
  lineDashy:number,
  changeLineDashy:Function,
  lineDashOffset:number,
  changeLineDashOffset:Function,
}
const  Dotted:React.FC<childProps>=(props)=> {
    const {lineDashx,changeLineDashx,lineDashy,changeLineDashy,lineDashOffset,changeLineDashOffset}=props;
    return (
        <div>
        <span>虚线中实线长度：</span>
          <input
            type="number"
            value={lineDashx}
            onChange={(e) => changeLineDashx(Number(e.target.value))}
          />
          <span>虚线中空白长度：</span>
          <input
            type="number"
            value={lineDashy}
            onChange={(e) => changeLineDashy(Number(e.target.value))}
          />
          <span>虚线中起始偏移：</span>
          <input
            type="number"
            value={lineDashOffset}
            onChange={(e) => changeLineDashOffset(Number(e.target.value))}
          />
        </div>
    )
}
export default Dotted;