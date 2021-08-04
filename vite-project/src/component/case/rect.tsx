import React , { useContext,useEffect,useState,useCallback } from 'react';
import { MouseControl } from '../control/mouseControl';
interface childProps{
    canvasAll:React.RefObject<HTMLCanvasElement>,
    rotate:number,
    ctx:any,
    globalAlpha:number,
    color:string,
    colors:string|undefined,
    shadowOffsetX:number,
    shadowOffsetY:number,
    shadowBlur:number,
    shadowColor:string,
    linewidth:number,
    lineJoin:string,
    lineCap:string,
    operation:string,
    lineDashx:number,
    lineDashy:number,
    lineDashOffset:number,
    sliderx1:number,
    slidery1:number,
    scaleAll:number,
    turn:string,
    changeTurn:Function,
}
const  Rect:React.FC<childProps>=(props)=> {
    const {ctx,turn,changeTurn,canvasAll,rotate,globalAlpha,color,colors,shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor,linewidth,lineJoin,lineCap,operation,lineDashx,lineDashy,lineDashOffset,sliderx1,slidery1,scaleAll}=props;
    const [left, setLeft] = useState<number>(200);
  const [top, setTop] = useState<number>(200);
  const [reUse, setReUse] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const changeReUse=useCallback((code:boolean) => {setReUse(code)},[],);
  const changeLeft=useCallback((code:number) => {setLeft(code)},[],);
  const changeTop=useCallback((code:number) => {setTop(code)},[],);
  const changeScale=useCallback((code:number) => {setScale(code)},[],);
  useEffect(() => {
      if(turn==='rect'){ draw()}
        //处理异步数据
      }, [
        scaleAll,sliderx1,slidery1,rotate,globalAlpha,operation,
        color, colors,lineDashx,lineDashOffset,linewidth,lineDashy,
        lineCap,lineJoin,turn,changeTurn,ctx,
        canvasAll,shadowBlur,shadowOffsetY,shadowColor,shadowOffsetX,
      ]);
    function draw(){
      changeTurn('rect');
      let canvas: any = canvasAll.current;
      var sw = 100 * scaleAll;
        var sh = 100 * scaleAll;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(left+sw/2, top+sh/2);
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.translate(-left-sw/2, -top-sh/2);
          ctx.globalAlpha = globalAlpha;
          var grad = ctx.createLinearGradient(0, 0, 500, 500);
          if (colors) {
            let colors1 = colors.split("-");
            let a=0;
                if(colors1.length>1){
                for(let i=0;i<colors1.length;i++){
                    grad.addColorStop(a, colors1[i]);
                    a=a+0.5;
                  }
                  ctx.strokeStyle = grad;
                } 
                else {
                    ctx.strokeStyle = color;
                  }
              }
              else {
                ctx.strokeStyle = color;
              }
           
          ctx.shadowOffsetX = shadowOffsetX;
          ctx.shadowOffsetY = shadowOffsetY;
          ctx.shadowBlur = shadowBlur;
          ctx.shadowColor = shadowColor;
          ctx.lineWidth = linewidth;
          ctx.lineJoin = lineJoin;
          ctx.lineCap = lineCap;
          ctx.globalCompositeOperation = operation;
          ctx.setLineDash([lineDashx, lineDashy]);
          ctx.lineDashOffset = lineDashOffset;
          ctx.strokeRect(sliderx1, slidery1, sw, sh);
          setLeft(sliderx1);
          setTop(slidery1);
          ctx.restore();
          let x=left,y=top;
          let isTransparent=true;
          MouseControl('rect',changeScale,changeLeft,changeTop,canvas,ctx,rotate,sw,sh,x,y,isTransparent);
  }
    return (
        <div>
            <button
          type="button"
          onClick={draw}
        >
          绘制矩形
        </button>
        </div>
    )
}
export default Rect;