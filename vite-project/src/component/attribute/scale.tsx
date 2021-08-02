import React from 'react';
interface childProps{
  scaleAll:number,
  changeScaleAll:Function,
}
const  Scale:React.FC<childProps>=(props)=> {
    const {scaleAll,changeScaleAll}=props;
    return (
        <div>
          <span>缩放：</span>
          <input
            type="range"
            min="0"
            max="2"
            value={scaleAll}
            onChange={(e) =>changeScaleAll( Number(e.target.value))}
            step="0.1"
          />
        </div>
    )
}
export default Scale;