import React , { useEffect } from 'react';
interface childProps{
  canvasWebgl: React.RefObject<HTMLCanvasElement>;
}
const  MouseDraw:React.FC<childProps>=(props)=> {
    const {canvasWebgl}=props;
    // useEffect(() => {
    //   if(turn==='webgl'){ ngon(3)}
    //     //处理异步数据
    //   }, [turn,canvasAll,changeTurn]);
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
   //鼠标绘制点
   function point() {
    var canvas: any = canvasWebgl.current;
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
    return (
        <div>
          <button
            type="button"
            onClick={() => {
              point();
            }}
          >
            鼠标绘制点
          </button>
        </div>
    )
}
export default MouseDraw;