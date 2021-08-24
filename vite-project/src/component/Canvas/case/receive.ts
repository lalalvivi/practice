// 三角形、矩形、直线、圆弧、贝塞尔、路径
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
// 图片
interface imgProps {
    canvasAll: React.RefObject<HTMLCanvasElement>;
    rotate: number;
    globalAlpha: number;
    color: string;
    colors: string | undefined;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    shadowColor: string;
    operation: string;
    sliderx1: number;
    slidery1: number;
    scaleAll: number;
    turn: string;
    changeTurn: Function;
    ctx: any;
    scaleSlider: number;
    sliderx: number;
    slidery: number;
    imgContent: string;
    changeImgContent: Function;
  }
//   文字
interface textProps {
    canvasAll: React.RefObject<HTMLCanvasElement>;
    rotate: number;
    globalAlpha: number;
    color: string;
    colors: string | undefined;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    shadowColor: string;
    operation: string;
    sliderx1: number;
    slidery1: number;
    scaleAll: number;
    turn: string;
    changeTurn: Function;
    ctx: any;
    textContent: string | undefined;
    changeTextContent: Function;
    fontSize: number;
    direction: string;
    textAlign: string;
    textBaseline: string;
    fontFamily: string;
  }
// 清除画布
interface clearProps{
    canvasAll:React.RefObject<HTMLCanvasElement>,
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
//   鼠标控制参数

export  type {childProps,imgProps,textProps,clearProps};