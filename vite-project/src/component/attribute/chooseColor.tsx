import React,{useEffect, useMemo} from 'react';
interface childProps{
  canvasAll: React.RefObject<HTMLCanvasElement>;
  selectedColor: React.RefObject<HTMLDivElement>;
  changeActive:Function,
  changeColor:Function,
  active:boolean;
  ctx: any;
  }
  
const  ChooseColor:React.FC<childProps>=(props)=> {
    const {changeActive,active,ctx,changeColor,canvasAll,selectedColor}=props;
    useMemo(() => { 
      choose();
    //处理异步数据
  }, [active]);
    function choose(){
      console.log(active)
      if (active) {
        function pick(event: any, destination: any) {
          var x = event.layerX;
          var y = event.layerY;
          var pixel = ctx.getImageData(x, y, 1, 1);
          var data = pixel.data;
          const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${
            data[3] / 255
          })`;
          // selectedColor.current.style.backgroundColor = rgba;
          changeColor(rgba);
          return rgba;
        }
        function select(event: any) {
          pick(event, selectedColor.current);
        }
        let canvas: any = canvasAll.current;
        let selectedColor: any = canvasAll.current;
        canvas.addEventListener("mousemove", select, false);
        canvas.addEventListener("click", function (event: any) {
          canvas.removeEventListener("mousemove", select, false);
          pick(event, selectedColor.current);
          changeActive(false)
        });
      }
    }
   
    return (
        <div>
          <button
            type="button"
            onClick={() => {
              changeActive(true)}}         
          >
            吸色
          </button>
        </div>
    )
}
export default ChooseColor;