import React from "react";
import { drawWebgl } from "../tool/parametric";
interface childProps {
  canvasWebgl: React.RefObject<HTMLCanvasElement>;
  type: string;
  changeType: Function;
}
const DrawType: React.FC<childProps> = (props) => {
  const { canvasWebgl, type, changeType } = props;
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
  //根据方程绘制图形
  function drawType() {
    var canvas: any = canvasWebgl.current;
    canvas.onmousedown = null;
    var context = canvas.getContext("webgl", {});
    var program = createProgram(context, VSHADER_SOURCE, FSHADER_SOURCE);
    context.program = program;
    context.useProgram(program);
    let points = drawWebgl(type);
    var vertices = new Float32Array(points);
    for (var i = 0; i < points.length; i++) {
      vertices[i] = points[i] / 100;
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
    // 画点
    // context.drawElements(
    //   context.LINE_STRIP,
    //   cells.length,
    //   context.UNSIGNED_SHORT,
    //   0
    // );
    context.drawArrays(context.LINE_STRIP, 0, points.length / 2);
  }
  return (
    <div>
      <select value={type} onChange={(e) => changeType(e.target.value)}>
        <option value="椭圆">椭圆</option>
        <option value="抛物线">抛物线 </option>
        <option value="阿基米德螺旋线">阿基米德螺旋线</option>
        <option value="星形线">星形线</option>
        <option value="二阶贝塞尔">二阶贝塞尔</option>
        <option value="三阶贝塞尔">三阶贝塞尔</option>
      </select>
      <button
        type="button"
        onClick={() => {
          drawType();
        }}
      >
        绘制图形或曲线
      </button>
    </div>
  );
};
export default DrawType;
