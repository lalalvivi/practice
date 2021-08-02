import React, { useState, useEffect, useRef,useMemo, useCallback,createContext } from "react";
import Router from './router';
import "./App.less";
import Rect from "./component/case/rect";
import Color from "./component/attribute/color";
import Dotted from "./component/attribute/dotted";
import LineStyle from "./component/attribute/lineStyle";
import Blur from "./component/attribute/blur";
import TextStyle from "./component/attribute/textStyle";
import Scale from "./component/attribute/scale";
import Rotate from "./component/attribute/rotate";
import Alpha from "./component/attribute/alpha";
import Source from "./component/attribute/source";
import Origin from "./component/attribute/origin";
import ImgStyle from "./component/attribute/imgStyle";
import Tangle from "./component/case/tangle";
import Line from "./component/case/line";
import Arc from "./component/case/arc";
import Quadratic from "./component/case/quadratic";
import Bezier from "./component/case/bezier";
import PathLine from "./component/case/pathLine";
import TextContent from "./component/case/text";
import ImgContent from "./component/case/img";
import ClearAll from "./component/case/clearAll";
import DrawShape from "./component/webgl/drawShape";
import ChooseColor from "./component/attribute/chooseColor";
import MouseDraw from "./component/webgl/mouseDraw";
import AnimationDraw from "./component/webgl/animation";
function App(){
  const changeColor=useCallback((code:string) => {setColor(code)},[],);
  const changeColors=useCallback((code:string) => {setColors(code)},[],);
  const changeLineDashx=useCallback((code:number) => {setLineDashx(code)},[],);
  const changeLineDashy=useCallback((code:number) => {setLineDashy(code)},[],);
  const changeLineDashOffset=useCallback((code:number) => {setLineDashOffset(code)},[],);
  const changeLinewidth=useCallback((code:number) => {setLinewidth(code)},[],);
  const changeLineCap=useCallback((code:string) => {setLineCap(code)},[],);
  const changeLineJoin=useCallback((code:string) => {setLineJoin(code)},[],);
  const changeShadowBlur=useCallback((code:number) => {setShadowBlur(code)},[],);
  const changeShadowColor=useCallback((code:string) => {setShadowColor(code)},[],);
  const changeShadowOffsetX=useCallback((code:number) => {setShadowOffsetX(code)},[],);
  const changeShadowOffsetY=useCallback((code:number) => {setShadowOffsetY(code)},[],);
  const changeFontSize=useCallback((code:number) => {setFontSize(code)},[],);
  const changeFontFamily=useCallback((code:string) => {setFontFamily(code)},[],);
  const changeTextAlign=useCallback((code:string) => {setTextAlign(code)},[],);
  const changeTextBaseline=useCallback((code:string) => {setTextBaseline(code)},[],);
  const changeDirection=useCallback((code:string) => {setDirection(code)},[],);
  const changeScaleAll=useCallback((code:number) => {setScaleAll(code)},[],);
  const changeRotate=useCallback((code:number) => {setRotate(code)},[],);
  const changeGlobalAlpha=useCallback((code:number) => {setGlobalAlpha(code)},[],);
  const changeOperation=useCallback((code:string) => {setOperation(code)},[],);
  const changeSliderx1=useCallback((code:number) => {setSliderx1(code)},[],);
  const changeSlidery1=useCallback((code:number) => {setSlidery1(code)},[],);
  const changeScaleSlider=useCallback((code:number) => {setScaleSlider(code)},[],);
  const changeSliderx=useCallback((code:number) => {setSliderx(code)},[],);
  const changeSlidery=useCallback((code:number) => {setSlidery(code)},[],);
  const changeTurn=useCallback((code:string) => {setTurn(code)},[],);
  const changeImgContent=useCallback((code:string) => {setImgContent(code)},[],);
  const changeTextContent=useCallback((code:string) => {setTextContent(code)},[],);
  const changeDrawN=useCallback((code:number) => {setDrawN(code)},[],);
  const changeActive=useCallback((code:boolean) => {setActive(code)},[],);
  const [drawN, setDrawN] = useState<number>(3);
  const [turn, setTurn] = useState<string>("black");
  const [scaleAll, setScaleAll] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const [globalAlpha, setGlobalAlpha] = useState<number>(1);
  const [operation, setOperation] = useState<string>("source-over");
  const [color, setColor] = useState<string>("black");
  const [colors, setColors] = useState<string>();
  const [lineDashx, setLineDashx] = useState<number>(4);
  const [lineDashy, setLineDashy] = useState<number>(4);
  const [lineDashOffset, setLineDashOffset] = useState<number>(-4);
  const [linewidth, setLinewidth] = useState<number>(1);
  const [lineCap, setLineCap] = useState<string>("butt");
  const [lineJoin, setLineJoin] = useState<string>("miter");
  const [shadowBlur, setShadowBlur] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0)");
  const [shadowOffsetX, setShadowOffsetX] = useState<number>(0);
  const [shadowOffsetY, setShadowOffsetY] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(20);
  const [fontFamily, setFontFamily] = useState<string>("serif");
  const [textAlign, setTextAlign] = useState<string>("start");
  const [textBaseline, setTextBaseline] = useState<string>("alphabetic");
  const [direction, setDirection ] = useState<string>("inherit");
  const [textContent, setTextContent] = useState<string>();
  const [imgContent, setImgContent] = useState("https://cdn1.mihuiai.com/media/images/b7bb3b4a-4802-4c6a-b879-bd61db1ee675_thumb.png?x-oss-process=style/small");
  const [scaleSlider, setScaleSlider] = useState<number>(1);
  const [sliderx, setSliderx] = useState<number>(1);
  const [slidery, setSlidery] = useState<number>(1);
  const [sliderx1, setSliderx1] = useState<number>(200);
  const [slidery1, setSlidery1] = useState<number>(200);
  const [active, setActive] = useState<boolean>(false);
  const selectedColor = useRef();
  const canvasAll = useRef();
  const canvasWebgl = useRef();
  const [ctx,setCtx]= useState<any>();
  useEffect(() => {
    setCtx(init())
    // change(turn);  
    //处理异步数据
  }, [
    ctx,canvasAll,turn,scaleAll,scaleSlider,sliderx,slidery,sliderx1,slidery1,
    direction,textAlign,rotate,globalAlpha,operation,active,
    color,colors,lineDashx,lineDashOffset,linewidth,lineDashy,
    lineCap,lineJoin,textBaseline,selectedColor,fontFamily,
   fontSize,shadowBlur,shadowOffsetY,shadowColor,shadowOffsetX,
  ]);
  function init(){
    let canvas: any = canvasAll.current;
        if (canvas.getContext) {
          let ctx = canvas.getContext("2d");
          return ctx;
        }
  }
  return (
    <div className="all">
       {/* <Router /> */}
      <div className="left">
        <Rect ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <Tangle  ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <Line ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <Arc ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <Quadratic ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <Bezier ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <PathLine ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}linewidth={linewidth}lineJoin={lineJoin}lineCap={lineCap}operation={operation} lineDashx={lineDashx} lineDashy={lineDashy} lineDashOffset={lineDashOffset} sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <TextContent textContent={textContent} changeTextContent={changeTextContent} ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}fontSize={fontSize}fontFamily={fontFamily}direction={direction}operation={operation} textAlign={textAlign} textBaseline={textBaseline}  sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
        <ImgContent imgContent={imgContent} changeImgContent={changeImgContent} ctx={ctx} turn={turn} changeTurn={changeTurn} canvasAll={canvasAll} rotate={rotate} globalAlpha={globalAlpha} color={color} colors={colors} shadowOffsetX={shadowOffsetX} shadowOffsetY={shadowOffsetY} shadowBlur={shadowBlur} shadowColor={shadowColor}scaleSlider={scaleSlider}sliderx={sliderx}slidery={slidery}operation={operation}   sliderx1={sliderx1} slidery1={slidery1}scaleAll={scaleAll}/>
          <ImgStyle scaleSlider={scaleSlider} changeScaleSlider={changeScaleSlider} sliderx={sliderx} changeSliderx={changeSliderx} slidery={slidery} changeSlidery={changeSlidery}/>
        <Origin sliderx1={sliderx1} changeSliderx1={changeSliderx1} slidery1={slidery1} changeSlidery1={changeSlidery1} />
      </div>
      <div className="right">
        <ClearAll ctx={ctx}  canvasAll={canvasAll} turn={turn} changeTurn={changeTurn} changeColor={changeColor} changeScaleAll={changeScaleAll} changeRotate={changeRotate} changeGlobalAlpha={changeGlobalAlpha} changeColors={changeColors} changeLinewidth={changeLinewidth} changeLineCap={changeLineCap} changeLineJoin={changeLineJoin} changeShadowBlur={changeShadowBlur} changeShadowColor={changeShadowColor} changeShadowOffsetX={changeShadowOffsetX} changeShadowOffsetY={changeShadowOffsetY} changeFontSize={changeFontSize} changeFontFamily={changeFontFamily} changeTextAlign={changeTextAlign} changeTextBaseline={changeTextBaseline} changeDirection={changeDirection} changeTextContent={changeTextContent} changeImgContent={changeImgContent} changeScaleSlider={changeScaleSlider} changeSliderx={changeSliderx} changeSlidery={changeSlidery} changeSliderx1={changeSliderx1} changeSlidery1={changeSlidery1} changeOperation={changeOperation} changeLineDashx={changeLineDashx} changeLineDashy={changeLineDashy} changeLineDashOffset={changeLineDashOffset} />
        <div className="rightContent">
            <Source operation={operation} changeOperation={changeOperation} />
            <Scale  scaleAll={scaleAll} changeScaleAll={changeScaleAll}/>
            <Rotate rotate={rotate} changeRotate={changeRotate}/>
            <Alpha globalAlpha={globalAlpha} changeGlobalAlpha={changeGlobalAlpha}/>
          <Color color={color} changeColor={changeColor} colors={colors} changeColors={changeColors}/>
          <div
            ref={selectedColor}
            className="selectedColor"
          ></div>
          <Dotted lineDashx={lineDashx} changeLineDashx={changeLineDashx} lineDashy={lineDashy} changeLineDashy={changeLineDashy} lineDashOffset={lineDashOffset} changeLineDashOffset={changeLineDashOffset}/>
          <LineStyle linewidth={linewidth} changeLinewidth={changeLinewidth} lineCap={lineCap} lineJoin={lineJoin} changeLineCap={changeLineCap} changeLineJoin={changeLineJoin}/>
          <Blur shadowBlur={shadowBlur} changeShadowBlur={changeShadowBlur} shadowColor={shadowColor} changeShadowColor={changeShadowColor} shadowOffsetX={shadowOffsetX} changeShadowOffsetX={changeShadowOffsetX} shadowOffsetY={shadowOffsetY} changeShadowOffsetY={changeShadowOffsetY}/>
          <TextStyle fontSize={fontSize} changeFontSize={changeFontSize} fontFamily={fontFamily} changeFontFamily={changeFontFamily} textAlign={textAlign} changeTextAlign={changeTextAlign} textBaseline={textBaseline} changeTextBaseline={changeTextBaseline} direction={direction} changeDirection={changeDirection} />
          <ChooseColor canvasAll={canvasAll} selectedColor={selectedColor}changeColor={changeColor} active={active} ctx={ctx} changeActive={changeActive}></ChooseColor>
          <MouseDraw canvasWebgl={canvasWebgl}></MouseDraw>
          <AnimationDraw canvasWebgl={canvasWebgl}></AnimationDraw>
         <DrawShape drawN={drawN} changeDrawN={changeDrawN} canvasWebgl={canvasWebgl}/>
        </div>

        <div className="canvasAll">
        <canvas className="canvas" ref={canvasAll} id="canvas" width="800" height="800"></canvas>
        </div>
        <canvas ref={canvasWebgl} id="canvas1" width="1720" height="800"></canvas>

      </div>
    </div>
  );
}
export default App;
