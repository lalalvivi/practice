import React from 'react';
interface childProps{
  globalAlpha:number,
  changeGlobalAlpha:Function,
}
const  Alpha:React.FC<childProps>=(props)=> {
    const {globalAlpha,changeGlobalAlpha}=props;
    return (
        <div>
          <span>透明度：</span>
          <input
            type="range"
            min="0"
            max="1"
            value={globalAlpha}
            onChange={(e) =>changeGlobalAlpha( Number(e.target.value))}
            step="0.1"
          />
        </div>
    )
}
export default Alpha;