import React , { useEffect } from 'react';
interface childProps{
  canvasWebgl: React.MutableRefObject<undefined>;
  drawN:number;
  changeDrawN:Function;
}
const  DrawShape:React.FC<childProps>=(props)=> {
    const {canvasWebgl,changeDrawN,drawN}=props;
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
   //绘制正n边形
   function ngon(n:number){
    var canvas: any = canvasWebgl.current;
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
        <div>
            <input
          type="number"
          value={drawN}
          onChange={(e) => changeDrawN(e.target.value)}
        />
             <button
            type="button"
            onClick={() => {
              ngon(drawN);
            }}
          >
            绘制正n边形
          </button>
        </div>
    )
}
export default DrawShape;