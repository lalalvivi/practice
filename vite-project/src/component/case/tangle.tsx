import React , { useContext,useEffect,useState,useCallback } from 'react';
interface childProps{
    canvasAll:React.RefObject<HTMLCanvasElement>,
    rotate:number,
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
    ctx:any,
}
const  Tangle:React.FC<childProps>=(props)=> {
    const {turn,ctx,changeTurn,canvasAll,rotate,globalAlpha,color,colors,shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor,linewidth,lineJoin,lineCap,operation,lineDashx,lineDashy,lineDashOffset,sliderx1,slidery1,scaleAll}=props;
    const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
    useEffect(() => {
      if(turn==='tangle'){ draw()}
        //处理异步数据
      }, [
        scaleAll,sliderx1,slidery1,rotate,globalAlpha,operation,
        color, colors,lineDashx,lineDashOffset,linewidth,lineDashy,
        lineCap,lineJoin,turn,changeTurn,ctx,
        canvasAll,shadowBlur,shadowOffsetY,shadowColor,shadowOffsetX,
      ]);
    function draw(){
      changeTurn('tangle');
        let canvas: any = canvasAll.current;
          var a = 50;
          var b = a + 25;
          var c = a - 25;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(left+(b-c)/2, top+(b-c)/2);
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.translate(-left-(b-c)/2, -top-(b-c)/2);
          ctx.globalAlpha = globalAlpha;
          var grad = ctx.createLinearGradient(0, 0, 500, 500);
          if (colors) {
            let colors1 = colors.split("-");
            let a=0;
            for(let i=0;i<colors1.length;i++){
              grad.addColorStop(a, colors1[i]);
              a=a+0.5;
            }
            ctx.strokeStyle = grad;
          } else {
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
          ctx.beginPath();
          ctx.moveTo(a * scaleAll+left, a * scaleAll+top);
          ctx.lineTo(b * scaleAll+left, b * scaleAll+top);
          ctx.lineTo(c * scaleAll+left, b * scaleAll+top);
          ctx.closePath();
          ctx.stroke();
          setLeft(sliderx1);
          setTop(slidery1);
          ctx.restore();

    }
    return (
        <div>
            <button
          type="button"
          onClick={draw}
        >
          绘制三角形
        </button>
        </div>
    )
}
export default Tangle;