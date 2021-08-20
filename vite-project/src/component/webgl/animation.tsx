import React from "react";
interface childProps {
  canvasWebgl: React.RefObject<HTMLCanvasElement>;
}
const AnimationDraw: React.FC<childProps> = (props) => {
  const { canvasWebgl } = props;
  // 顶点着色器代码(决定顶在哪里，大小)
  // 顶点着色器代码(决定顶在哪里，大小)
  var vertexShader = `
      attribute vec2 a_Position;
      attribute vec2 a_texCoord;
      uniform float u_rotation;
      uniform float u_time;
      uniform float u_duration;
      uniform float u_scale;
      uniform vec2  u_dir;
      varying float vp;
      varying vec2 v_texCoord;
      void main() {
        float p = min(1.0, u_time / u_duration);
          float rad = u_rotation + 3.14 * 10.0 * p;
          float scale = u_scale * p * (2.0 - p);
          vec2 offset = 2.0 * u_dir * p * p;
        // 平移矩阵
        mat3 translateMatrix = mat3(
          1.0, 0.0, 0.0,
          0.0, 1.0, 0.0,
          offset.x, offset.y, 1.0
        );
        // 旋转矩阵
        mat3 rotateMatrix = mat3(
          cos(rad), sin(rad), 0.0,
          -sin(rad), cos(rad), 0.0,
          0.0, 0.0, 1.0
        );
        // 缩放矩阵
        mat3 scaleMatrix = mat3(
          scale, 0.0, 0.0,
          0.0, scale, 0.0,
          0.0, 0.0, 1.0
        );
        //扭曲矩阵
        mat3 skewMatrix = mat3(
          1.0, tan(rad), 0.0,
          tan(rad), 1.0, 0.0,
          0.0, 0.0, 1.0
        );

      // 先随机偏移
      mat3 randomTranslate = mat3(
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
      );
      vec3 translate = randomTranslate * vec3(a_Position, 1.0);
      vec3 pos= randomTranslate*translateMatrix*scaleMatrix * rotateMatrix* vec3(a_Position, 1.0) ;
      // vec3 pos= skewMatrix* vec3(a_Position, 1.0) ;
      gl_Position = vec4(pos, 1.0); // 设置顶点的位置
      v_texCoord = a_texCoord;
      vp = p;
    }
      `;
  // 片元着色器代码（给像素上色）
  var fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    void main() {
      gl_FragColor = texture2D(u_texture, v_texCoord); // 设置顶点的颜色
    }
    `;
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
  //绘制
  function moreAnimation() {
    var canvas: any = canvasWebgl.current;
    canvas.onmousedown = null;
    var context = canvas.getContext("webgl", {});
    var program = createProgram(context, vertexShader, fragmentShader);
    context.program = program;
    context.useProgram(program);
    var vertices = new Float32Array(24);
    var R = 0.08; // 大圆的半径
    var r = 0.04; // 小圆的半径
    // 角度转化成弧度
    const getRadianFromAngle = (angle: number) => (Math.PI / 180) * angle;
    // 封装下cos  sin
    const cos = (angle: number) => Math.cos(getRadianFromAngle(angle));
    const sin = (angle: number) => Math.sin(getRadianFromAngle(angle));
    var stepAngle = 360 / 5;
    var j = 0;
    vertices[0] = 0;
    vertices[1] = 0;
    for (var i = 2; i < 26; i += 4) {
      // 计算顶点x坐标
      vertices[i] = R * cos(18 + j * stepAngle);
      // 计算顶点y坐标
      vertices[i + 1] = -R * sin(18 + j * stepAngle);
      vertices[i + 2] = r * cos(54 + j * stepAngle);
      vertices[i + 3] = -r * sin(54 + j * stepAngle);
      j++;
    }
    const texCoordPos = [
      -1.0,
      1.0,
      0.0,
      1.0, // 前 2 位是位置坐标， 后 2 位是纹理坐标
      -1.0,
      -1.0,
      0.0,
      0.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      0.0,
    ];
    // 创建一个缓存对象，用于存放顶点数据
    var vertexBuffer = context.createBuffer();
    // 绑定缓存对象
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 把数据写到缓冲对象中
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array(vertices),
      context.STATIC_DRAW
    );

    const texCoordBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array(texCoordPos),
      context.STATIC_DRAW
    );
    // 获取顶点着色器代码中的顶点变量
    var a_Position = context.getAttribLocation(context.program, "a_Position");
    const a_texCoord = context.getAttribLocation(context.program, "a_texCoord");
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 设置变量获取数据规则
    context.vertexAttribPointer(
      a_Position,
      2,
      context.FLOAT,
      false,
      Float32Array.BYTES_PER_ELEMENT * 2,
      0
    );
    // 允许变量从 ARRAY_BUFFER目标上绑定的缓冲区对象获取数据
    context.enableVertexAttribArray(a_Position);
    context.bindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
    context.vertexAttribPointer(
      a_texCoord,
      2,
      context.FLOAT,
      false,
      Float32Array.BYTES_PER_ELEMENT * 2,
      0
    );
    context.enableVertexAttribArray(a_texCoord);
    // 纹理
    var texture = context.createTexture();
    //向target绑定纹理对象
    context.bindTexture(context.TEXTURE_2D, texture);
    //配置纹理参数
    context.texParameteri(
      context.TEXTURE_2D,
      context.TEXTURE_MIN_FILTER,
      context.NEAREST
    );

    context.texParameteri(
      context.TEXTURE_2D,
      context.TEXTURE_MAG_FILTER,
      context.NEAREST
    );
    //处理图片像素非2的幂次方的配置
    context.texParameteri(
      context.TEXTURE_2D,
      context.TEXTURE_WRAP_S,
      context.CLAMP_TO_EDGE
    );

    context.texParameteri(
      context.TEXTURE_2D,
      context.TEXTURE_WRAP_T,
      context.CLAMP_TO_EDGE
    );
    var u_texture = context.getUniformLocation(context.program, "u_texture");
    var image = new Image();
    image.src =
      "https://img0.baidu.com/it/u=1242053365,2901037121&fm=26&fmt=auto&gp=0.jpg";
    image.crossOrigin = "anonymous";
    image.onload = function () {
      //对问题图像进行y轴反转
      context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
      //开启0号纹理单元
      context.activeTexture(context.TEXTURE0);
      //配置纹理图像
      context.texImage2D(
        context.TEXTURE_2D,
        0,
        context.RGB,
        context.RGB,
        context.UNSIGNED_BYTE,
        image
      );
      //将0号纹理传递给着色器
      context.uniform1i(u_texture, 0);
      context.clear(context.COLOR_BUFFER_BIT); // Clear <canvas>
      tick();
    };
    function randomFives() {
      const u_rotation = Math.random() * Math.PI; // 初始旋转角度
      const u_scale = Math.random() * 0.05 + 0.5;
      const u_time = 0;
      const u_duration = 5.0;
      const rad = Math.random() * Math.PI * 2;
      const u_dir = [Math.cos(rad), Math.sin(rad)];
      const startTime = performance.now();

      return {
        u_rotation,
        u_scale,
        u_time,
        u_duration,
        u_dir,
        startTime,
      };
    }
    let fives: any = [];
    function tick() {
      for (let i = 0; i < 5 * Math.random(); i++) {
        fives.push(randomFives());
      }
      context.clear(context.COLOR_BUFFER_BIT);
      fives.forEach((tri: any) => {
        tri.u_time = (performance.now() - tri.startTime) / 1000;
        setUniforms(context, tri);
      });

      fives = fives.filter((tri: any) => {
        return tri.u_time <= tri.u_duration;
      });
      requestAnimationFrame(tick);
    }
  }

  function setUniforms(
    context: any,
    { u_rotation, u_scale, u_time, u_duration, u_dir }: any
  ) {
    var u_scaleMatrix = context.getUniformLocation(context.program, "u_scale");
    context.uniform1f(u_scaleMatrix, u_scale);
    var u_rotateMatrix = context.getUniformLocation(
      context.program,
      "u_rotation"
    );
    context.uniform1f(u_rotateMatrix, u_rotation);
    var u_moveMatrix = context.getUniformLocation(context.program, "u_dir");
    context.uniform2fv(u_moveMatrix, u_dir);
    var time = context.getUniformLocation(context.program, "u_time");
    context.uniform1f(time, u_time);
    var duration = context.getUniformLocation(context.program, "u_duration");
    context.uniform1f(duration, u_duration);
    context.drawArrays(context.TRIANGLE_FAN, 0, 12);
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          moreAnimation();
        }}
      >
        动态五角星
      </button>
    </div>
  );
};
export default AnimationDraw;
