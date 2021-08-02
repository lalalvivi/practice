import React from 'react';
interface childProps{
  rotate:number,
  changeRotate:Function,
}
const  Rotate:React.FC<childProps>=(props)=> {
    const {rotate,changeRotate}=props;
    return (
        <div>
          <span>旋转：</span>
          <input
            type="range"
            min="0"
            max="360"
            value={rotate}
            onChange={(e) =>changeRotate( Number(e.target.value))}
            step="1"
          />
        </div>
    )
}
export default Rotate;