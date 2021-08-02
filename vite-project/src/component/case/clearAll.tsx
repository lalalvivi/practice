import React , { useContext,useEffect,useState,useCallback } from 'react';
interface childProps{
  canvasAll:React.MutableRefObject<undefined>,
  ctx:any,
  turn:string,
  changeTurn:Function,
  changeColor:Function;
  changeScaleAll:Function;
  changeRotate:Function;
  changeGlobalAlpha:Function;
  changeColors:Function;
  changeLinewidth:Function;
  changeLineCap:Function;
  changeLineJoin:Function;
  changeShadowBlur:Function;
  changeShadowColor:Function;
  changeShadowOffsetX:Function;
  changeShadowOffsetY:Function;
  changeFontSize:Function;
  changeFontFamily:Function;
  changeTextAlign:Function;
  changeTextBaseline:Function;
  changeDirection:Function;
  changeTextContent:Function;
  changeImgContent:Function;
  changeScaleSlider:Function;
  changeSliderx:Function;
  changeSlidery:Function;
  changeSliderx1:Function;
  changeSlidery1:Function;
  changeOperation:Function;
  changeLineDashx:Function;
  changeLineDashy:Function;
  changeLineDashOffset:Function;
}
const  ClearAll:React.FC<childProps>=(props)=> {
    const {canvasAll,ctx,turn,changeColor,changeTurn,changeScaleAll,changeRotate,changeGlobalAlpha,changeColors,changeLinewidth,changeLineCap,changeLineJoin,changeShadowBlur,changeShadowColor,changeShadowOffsetX,changeShadowOffsetY,changeFontSize,changeFontFamily,changeTextAlign,changeTextBaseline,changeDirection,changeTextContent,changeImgContent,changeScaleSlider,changeSliderx,changeSlidery,changeSliderx1,changeSlidery1,changeOperation,changeLineDashx,changeLineDashy,changeLineDashOffset,
     }=props;
    useEffect(() => {
      if(turn==='clear'){ draw()}
        //处理异步数据
      }, [turn,changeColor,changeTurn,changeScaleAll,changeRotate,changeGlobalAlpha,changeColors,changeLinewidth,changeLineCap,changeLineJoin,changeShadowBlur,changeShadowColor,changeShadowOffsetX,changeShadowOffsetY,changeFontSize,changeFontFamily,changeTextAlign,changeTextBaseline,changeDirection,changeTextContent,changeImgContent,changeScaleSlider,changeSliderx,changeSlidery,changeSliderx1,changeSlidery1,changeOperation,changeLineDashx,changeLineDashy,changeLineDashOffset,
        canvasAll,ctx
      ]);
    function draw(){
      changeTurn('clear');
        let canvas: any = canvasAll.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
          changeColor("black");
          changeTurn("black");
          changeScaleAll(1);
          changeRotate(0);
          changeGlobalAlpha(1);
          changeColors("");
          changeLinewidth(1);
          changeLineCap("butt");
          changeLineJoin("miter");
          changeShadowBlur(0);
          changeShadowColor("rgba(0, 0, 0, 0)");
          changeShadowOffsetX(0);
          changeShadowOffsetY(0);
          changeFontSize(20);
          changeFontFamily("serif");
          changeTextAlign("start");
          changeTextBaseline("alphabetic");
          changeDirection("inherit");
          changeTextContent("");
          changeImgContent("");
          changeScaleSlider(1);
          changeSliderx(1);
          changeSlidery(1);
          changeSliderx1(100);
          changeSlidery1(100);
          changeOperation("source-over");
          changeLineDashx(4);
          changeLineDashy(4);
          changeLineDashOffset(-4);
    }
    return (
        <div>
            <button
          type="button"
          onClick={draw}
        >
          清除画布
        </button>
        </div>
    )
}
export default ClearAll;