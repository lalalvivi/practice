import React from 'react';
interface childProps{
  operation:string,
  changeOperation:Function,
}
const  Source:React.FC<childProps>=(props)=> {
    const {operation,changeOperation}=props;
    return (
        <div>
          <span>图层模式：</span>
          <select
            value={operation}
            onChange={(e) => changeOperation(e.target.value)}
          >
            <option value="source-over">source-over</option>
            <option value="source-in">source-in </option>
            <option value="source-out">source-out</option>
            <option value="source-atop">source-atop</option>
            <option value="destination-over">destination-over</option>
            <option value="destination-in">destination-in</option>
            <option value="destination-out">destination-out</option>
            <option value="destination-atop">destination-atop</option>
            <option value="lighter">lighter</option>
            <option value="copy">copy</option>
            <option value="xor">xor</option>
            <option value="multiply">multiply</option>
            <option value="overlay">overlay</option>
            <option value="darken">darken</option>
            <option value="lighten">lighten</option>
            <option value="color-dodge">color-dodge</option>
            <option value="color-burn">color-burn</option>
            <option value="hard-light">hard-light</option>
            <option value="soft-light">soft-light</option>
            <option value="difference">difference</option>
            <option value="exclusion">exclusion</option>
            <option value="hue">hue</option>
            <option value="color">color</option>
            <option value="luminosity">luminosity</option>
          </select>
        </div>
    )
}
export default Source;