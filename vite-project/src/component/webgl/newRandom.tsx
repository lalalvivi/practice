import React from "react";
interface childProps {
  canvasWebgl: React.RefObject<HTMLCanvasElement>;
}
const NewRandom: React.FC<childProps> = (props: any) => {
  const { canvasWebgl } = props;
  const vertex = `
      attribute vec2 a_vertexPosition;
      uniform mat3 modelMatrix;
      
      void main() {
        vec3 pos = modelMatrix * vec3(a_vertexPosition, 1);
        gl_Position = vec4(pos, 1);
      }
    `;

  const fragment = `
      #ifdef GL_ES
      precision highp float;
      #endif
      uniform vec4 u_color;
      
      void main() {
        gl_FragColor = u_color;
      }
    `;
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
  function grad() {
    var canvas: any = canvasWebgl.current;
    canvas.onmousedown = null;
    var context = canvas.getContext("webgl", {});
    var program = createProgram(context, vertex, fragment);
    context.program = program;
    context.useProgram(program);
    const alpha = (2 * Math.PI) / 3;
    const beta = 2 * alpha;
    let points = [
      [0, 0.1],
      [0.1 * Math.sin(alpha), 0.1 * Math.cos(alpha)],
      [0.1 * Math.sin(beta), 0.1 * Math.cos(beta)],
    ];
    var vertices = new Float32Array(points.flat());
    const COUNT = 3000;
    // 创建一个缓存对象，用于存放顶点数据
    var vertexBuffer = context.createBuffer();
    // 绑定缓存对象
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 把数据写到缓冲对象中
    context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW);
    // 获取顶点着色器代码中的顶点变量
    var a_Position = context.getAttribLocation(
      context.program,
      "a_vertexPosition"
    );
    // 设置变量获取数据规则
    context.vertexAttribPointer(a_Position, 2, context.FLOAT, false, 0, 0);
    // 允许变量从 ARRAY_BUFFER目标上绑定的缓冲区对象获取数据
    context.enableVertexAttribArray(a_Position);
    // 每一次重绘时的背景色
    context.clearColor(0.0, 0.0, 0.0, 0.0);
    // 清除 <canvas>
    context.clear(context.COLOR_BUFFER_BIT);
    // context.drawArrays(context.TRIANGLE_FAN, 0, 3);
    render();
    function render() {
      for (let i = 0; i < COUNT; i++) {
        const x = 2 * Math.random() - 1;
        const y = 2 * Math.random() - 1;
        const rotation = 2 * Math.PI * Math.random();
        let modelMatrix = [
          Math.cos(rotation),
          -Math.sin(rotation),
          0,
          Math.sin(rotation),
          Math.cos(rotation),
          0,
          x,
          y,
          1,
        ];

        var u_Matrix = context.getUniformLocation(
          context.program,
          "modelMatrix"
        );
        context.uniformMatrix3fv(u_Matrix, false, modelMatrix);
        let color = [Math.random(), Math.random(), Math.random(), 1];
        var u_color = context.getUniformLocation(context.program, "u_color");
        // 将颜色传递给 uniform 变量
        context.uniform4f(u_color, color[0], color[1], color[2], color[3]);
        context.drawArrays(context.TRIANGLE_FAN, 0, 3);
      }
      requestAnimationFrame(render);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          grad();
        }}
      >
        新随机图形
      </button>
    </div>
  );
};

export default NewRandom;
