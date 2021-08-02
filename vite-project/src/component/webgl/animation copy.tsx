import React , { useEffect } from 'react';
interface childProps{
  canvasWebgl: React.MutableRefObject<undefined>;
}
const  AnimationDraw:React.FC<childProps>=(props)=> {
    const {canvasWebgl}=props;
          // 顶点着色器代码(决定顶在哪里，大小)
               // 顶点着色器代码(决定顶在哪里，大小)
      var vertexShader =
      `
      attribute vec4 a_Position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
       uniform mat4 u_rotateMatrix;
       uniform mat4 u_scaleMatrix;
       uniform mat4 u_moveMatrix;
      void main() {
      v_texCoord = a_texCoord;
      gl_Position =u_moveMatrix*u_rotateMatrix *u_scaleMatrix*a_Position; // 设置顶点的位置
      }
      `     
    // 片元着色器代码（给像素上色）
    var fragmentShader =`
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    void main() {
      gl_FragColor = texture2D(u_texture, v_texCoord); // 设置顶点的颜色
    }
    `
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
    const getRadianFromAngle = (angle:number) => (Math.PI / 180) * angle;
  // 封装下cos  sin
    const cos = (angle:number) => Math.cos(getRadianFromAngle(angle));
    const sin = (angle:number) => Math.sin(getRadianFromAngle(angle));
    var stepAngle = 360/5 ;
    var j=0;
    vertices[0]=0;
    vertices[1]=0;
    for(var i=2; i<26; i+=4){   
      // 计算顶点x坐标
      vertices[i] = R * cos(18+j*stepAngle);
      // 计算顶点y坐标
      vertices[i+1] = -R * sin(18+j*stepAngle);
      vertices[i+2] = r * cos(54+j*stepAngle);
      vertices[i+3] = -r * sin(54+j*stepAngle);
      j++;
    }
const texCoordPos = [
    0, 0,
    1, 0,
    0,1,
    1, 1,
    1, 1,
    0, 1,
    1,0,
    0, 0,
    1,1,
    0,1,
    0,1,
    0,0
];
      let scaleX = 0.1;
      let scaleY = 0.1;
      let ANGLE = 0;
      let moveX = 0;
      let moveY = 0;
      let last = Date.now();
          // var vertices = new Float32Array([
    //   0.0, 0.5, -0.5, -0.5, 0.5, -0.5,
    // ]);
    // 创建一个缓存对象，用于存放顶点数据
    var vertexBuffer = context.createBuffer();
    // 绑定缓存对象
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 把数据写到缓冲对象中
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
    
    const texCoordBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(texCoordPos), context.STATIC_DRAW);
    // 获取顶点着色器代码中的顶点变量
    var a_Position = context.getAttribLocation(context.program, "a_Position");
    const a_texCoord = context.getAttribLocation(context.program, "a_texCoord");
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
    // 设置变量获取数据规则
    context.vertexAttribPointer(a_Position, 2, context.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
    // 允许变量从 ARRAY_BUFFER目标上绑定的缓冲区对象获取数据
    context.enableVertexAttribArray(a_Position);
    context.bindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
    context.vertexAttribPointer(a_texCoord, 2, context.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
    context.enableVertexAttribArray(a_texCoord);
    // 纹理
    var texture = context.createTexture();
     //向target绑定纹理对象
     context.bindTexture(context.TEXTURE_2D,texture);
     //配置纹理参数
     context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);

     context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
     //处理图片像素非2的幂次方的配置
     context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);

     context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
    var u_texture = context.getUniformLocation(context.program,'u_texture');
    var image = new Image();
    image.src = 'https://cdn1.mihuiai.com/media/images/b7bb3b4a-4802-4c6a-b879-bd61db1ee675_thumb.png?x-oss-process=style/small';
    image.crossOrigin = "anonymous";
    image.onload = function(){
       //对问题图像进行y轴反转
       context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL,1);
       //开启0号纹理单元
       context.activeTexture(context.TEXTURE0);
       //配置纹理图像
       context.texImage2D(context.TEXTURE_2D,0,context.RGB,context.RGB,context.UNSIGNED_BYTE,image);
       //将0号纹理传递给着色器
       context.uniform1i(u_texture,0);
       context.clear(context.COLOR_BUFFER_BIT);   // Clear <canvas>
       animation();
    }
    let rotateArray:Float32Array[]=[];
    let scaleArray:Float32Array[]=[];
    let moveArray:Float32Array[]=[];

      // 创建旋转平移缩放矩阵
      function drawStart(ANGLE_STEP:number,SCALE_STEP:number,MOVE_STEP:number){

      const now = Date.now();
      const distance = now - last;
      const angle = (ANGLE + (distance * ANGLE_STEP) / 1000.0) % 360;
      ANGLE = angle;
      const scale = (scaleX + (distance * SCALE_STEP) / 1000.0) % 1.0;
      scaleX = scale;
      scaleY = scale;
      const move = (moveX + (distance * MOVE_STEP) / 1000.0) % 800;
      moveX = move;
      moveY = move;
      last = now;
      console.log(ANGLE)
      var radian = Math.PI * ANGLE / 180.0; // 角度转弧度
      var cosB = Math.cos(radian), sinB = Math.sin(radian);
      var rotateMatrix = new Float32Array([
      cosB, sinB, 0.0, 0.0,
      -sinB, cosB, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0, 0, 0.0, 1.0
  
    ]);
    var scaleMatrix = new Float32Array([
     scaleX, 0.0, 0.0, 0.0,
      0.0, scaleY, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
  
    ]);
    var moveMatrix = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      moveX/800, moveY/800, 0.0, 1.0
    ]);
    rotateArray.push(rotateMatrix)
    scaleArray.push(scaleMatrix)
    moveArray.push(moveMatrix)
    // 将矩阵传输给顶点着色器
    var u_rotateMatrix= context.getUniformLocation(context.program, 'u_rotateMatrix');
    context.uniformMatrix4fv(u_rotateMatrix, false,rotateMatrix);
    var u_scaleMatrix= context.getUniformLocation(context.program, 'u_scaleMatrix');
    context.uniformMatrix4fv(u_scaleMatrix, false,scaleMatrix);
    var u_moveMatrix = context.getUniformLocation(context.program, 'u_moveMatrix');
    context.uniformMatrix4fv(u_moveMatrix, false,moveMatrix);
    context.drawArrays(context.TRIANGLE_FAN, 0, 12);   
    window.requestAnimationFrame(animation);
}
function animation() {
  let ANGLE_STEP = Math.random()*45;
  let SCALE_STEP = Math.random()*0.3+0.1;
  let MOVE_STEP = Math.random()*200+100;
  drawStart(ANGLE_STEP ,SCALE_STEP,MOVE_STEP)
}
    // requestAnimationFrame(animation);
    // function animation(){  
    //   requestAnimationFrame(animation);
    //   drawStart();
    // }
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
    )
}
export default AnimationDraw;