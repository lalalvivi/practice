import React, { useState, useEffect, useRef,useMemo, useCallback,createContext } from "react";
import "./App.less";
import Rect from "../case/rect";
import Color from "../attribute/color";
import Dotted from "../attribute/dotted";
import LineStyle from "../attribute/lineStyle";
import Blur from "../attribute/blur";
import TextStyle from "../attribute/textStyle";
import Scale from "../attribute/scale";
import Rotate from "../attribute/rotate";
import Alpha from "../attribute/alpha";
import Source from "../attribute/source";
import Origin from "../attribute/origin";
import ImgStyle from "../attribute/imgStyle";
import Tangle from "../case/tangle";
import Line from "../case/line";
import Arc from "../case/arc";
import Quadratic from "../case/quadratic";
import Bezier from "../case/bezier";
import PathLine from "../case/pathLine";
import TextContent from "../case/text";
import ImgContent from "../case/img";
import ClearAll from "../case/clearAll";
import DrawShape from "../webgl/drawShape";
function Canvas(){
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
  const [imgContent, setImgContent] = useState("");
  const [scaleSlider, setScaleSlider] = useState<number>(0.5);
  const [sliderx, setSliderx] = useState<number>(1);
  const [slidery, setSlidery] = useState<number>(1);
  const [sliderx1, setSliderx1] = useState<number>(10);
  const [slidery1, setSlidery1] = useState<number>(10);
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
// 根据不同绘制调用不同函数
  // function change(param: string) {
  //   selectedColor.current.style.backgroundColor = color;
  // }
      // 顶点着色器代码(决定顶在哪里，大小)
      var VSHADER_SOURCE =
      "attribute vec4 a_Position;\n" +
      "void main() {\n" +
      "  gl_Position = a_Position;\n" + // 设置顶点的位置
      "  gl_PointSize = 10.0;\n" + // 设置顶点的大小
      "}\n";
   
    // 片元着色器代码（给像素上色）
    var FSHADER_SOURCE =
      "void main() {\n" +
      "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + // 设置顶点的颜色
      "}\n";
  //鼠标绘制点
  function point() {
    var canvas: any = document.getElementById("canvas1");
    var context = canvas.getContext("webgl", {});
    var program = createProgram(context, VSHADER_SOURCE, FSHADER_SOURCE);
    context.program = program;
    context.useProgram(program);
    var a_Position = context.getAttribLocation(context.program, "a_Position");
    var u_FragColor = context.getUniformLocation(
      context.program,
      "u_FragColor"
    );
    // 每一次重绘时的背景色
    context.clearColor(0.0, 0.0, 0.0, 0.0);
    // 清除 <canvas>
    context.clear(context.COLOR_BUFFER_BIT);
    canvas.onmousedown = function (ev: any) {
      click(ev, context, canvas, a_Position, u_FragColor);
    };
  }
 
  var g_colors: Array<Array<number>> = []; //存储点颜色的数组
  var g_points: Array<Array<number>> = [];
  function click(
    ev: any,
    gl: any,
    canvas: any,
    a_Position: any,
    u_FragColor: any
  ) {
    var x: number = ev.clientX; //鼠标点击处的X坐标
    var y: number = ev.clientY; //鼠标点击处的Y坐标
    var rect = ev.target.getBoundingClientRect();
    console.log(x, y, rect.left);
    g_points=[];
    //将浏览器绘图区坐标系下的坐标转换为webgl坐标系下的坐标
    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    g_points.push([x, y]);
    if (x >= 0 && y >= 0) {
      g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else {
      g_colors.push([1.0, 1.0, 1.0, 1.0]);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for (let index = 0; index < len; index++) {
      var xy = g_points[index];
      var rgba = g_colors[index];
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.drawArrays(gl.POINTS, 0, len);
    }
  }
  // 创建一个program（相当于着色器的上下文）
  function createProgram(context: any, vshader: any, fshader: any) {
    var vertexShader = loadShader(context, context.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(context, context.FRAGMENT_SHADER, fshader);
    var program = context.createProgram();
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    return program;
  }
  function loadShader(context: any, type: any, source: any) {
    var shader = context.createShader(type);
    context.shaderSource(shader, source);
    context.compileShader(shader);
    return shader;
  }
  //绘制空心三角形
  function morePoint() {
    var canvas: any = document.getElementById("canvas1");
    canvas.onmousedown = null;
    var context = canvas.getContext("webgl", {});
    var program = createProgram(context, VSHADER_SOURCE, FSHADER_SOURCE);
    context.program = program;
    context.useProgram(program);
    var vertices = new Float32Array([
      0.0, 0.5, -0.5, -0.5, 0.5, -0.5,
    ]);
    var n = 3;
    // 创建一个缓存对象，用于存放顶点数据
    var vertexBuffer = context.createBuffer();
    // 绑定缓存对象
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 把数据写到缓冲对象中
    context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW);
    // 获取顶点着色器代码中的顶点变量
    var a_Position = context.getAttribLocation(context.program, "a_Position");
    // 设置变量获取数据规则
    context.vertexAttribPointer(a_Position, 2, context.FLOAT, false, 0, 0);
    // 允许变量从 ARRAY_BUFFER目标上绑定的缓冲区对象获取数据
    context.enableVertexAttribArray(a_Position);
    // 每一次重绘时的背景色
    context.clearColor(0.0, 0.0, 0.0, 0.0);
    // 清除 <canvas>
    context.clear(context.COLOR_BUFFER_BIT);
    // 画n个点
    context.drawArrays(context.LINE_LOOP, 0, n);
  }
  //绘制正n边形
  function ngon(n:number){
    var canvas: any = document.getElementById("canvas1");
    canvas.onmousedown = null;
    var context = canvas.getContext("webgl", {});
    var program = createProgram(context, VSHADER_SOURCE, FSHADER_SOURCE);
    context.program = program;
    context.useProgram(program);
    if(n==4){
    var vertices = new Float32Array([
      -0.5, 0.5,-0.5, -0.5,  0.5, 0.5,0.5,-0.5
    ]);
  }else{
    var vertices = new Float32Array(n*2);
    var angle = 0; // 开始的弧度 
    var r = 0.5; // 圆的半径
    // θ值
    var stepAngle = 360/n * (Math.PI/180);
    for(var i=0; i<n*2; i+=2){
      // 计算顶点x坐标
      vertices[i] = r * Math.cos(angle);
      // 计算顶点y坐标
      vertices[i+1] = r * Math.sin(angle);
      angle += stepAngle;
    }
  }
   
    // 创建一个缓存对象，用于存放顶点数据
    var vertexBuffer = context.createBuffer();
    // 绑定缓存对象
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 把数据写到缓冲对象中
    context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW);
    // 获取顶点着色器代码中的顶点变量
    var a_Position = context.getAttribLocation(context.program, "a_Position");
    // 设置变量获取数据规则
    context.vertexAttribPointer(a_Position, 2, context.FLOAT, false, 0, 0);
    // 允许变量从 ARRAY_BUFFER目标上绑定的缓冲区对象获取数据
    context.enableVertexAttribArray(a_Position);
    // 每一次重绘时的背景色
    context.clearColor(0.0, 0.0, 0.0, 0.0);
    // 清除 <canvas>
    context.clear(context.COLOR_BUFFER_BIT);
    // 画n个点
    if(n==4){
    context.drawArrays(context.TRIANGLE_STRIP, 0, n);
    }
    else{
      context.drawArrays(context.TRIANGLE_FAN, 0, n)
    }
  }
  return (
    <div className="all">
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
          <TextStyle fontSize={fontSize} changeFontSize={changeFontSize} fontFamily={fontFamily} changeFontFamily={changeFontFamily} texTAlign={textAlign} changeTextAlign={changeTextAlign} textBaseline={textBaseline} changeTextBaseline={changeTextBaseline} direction={direction} changeDirection={changeDirection} />
          <button
            type="button"
            onClick={() => 
              setActive(true)}
            
          >
            吸色
          </button>
          <button
            type="button"
            onClick={() => {
              point();
            }}
          >
            鼠标绘制点
          </button>
          <button
            type="button"
            onClick={() => {
              morePoint();
            }}
          >
            绘制多点
          </button>
         <DrawShape canvasWebgl={canvasWebgl}/>
        </div>
        <canvas ref={canvasWebgl} id="canvas1" width="800" height="800"></canvas>

        <div className="canvasAll">
        <canvas className="canvas" ref={canvasAll} id="canvas" width="800" height="800"></canvas>
        </div>
      </div>
    </div>
  );
}
export default Canvas;
