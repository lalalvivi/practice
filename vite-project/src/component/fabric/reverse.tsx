import React from "react";

function Reverse(gl: any, imgContent: any, val: any) {
  let reverseUniform: any;
  var vertexShaderSource =
    "" +
    "attribute vec4 a_Position;" + //顶点位置坐标
    "attribute vec2 a_TexCoord;" + //纹理坐标
    "varying vec2 v_TexCoord;" + //插值后纹理坐标
    "void main(){" +
    "gl_Position = a_Position;" + //逐顶点处理
    "v_TexCoord = a_TexCoord;" + //纹理坐标插值计算
    "}";
  //片元着色器源码
  var fragShaderSource = `
precision highp float;
varying vec2 v_TexCoord;  
uniform sampler2D u_Sampler; 
uniform bool reverse;
void main(){ 
//采集纹素
vec4 texture = texture2D(u_Sampler,v_TexCoord);
if(reverse){        
  texture.b=1.0- texture.b;
  texture.g=1.0- texture.g;
  texture.r=1.0- texture.r;
};
          gl_FragColor = texture;
}
`;
  /**
   * 四个顶点坐标数据data，z轴为零
   * 定义纹理贴图在WebGL坐标系中位置
   **/
  var data = new Float32Array([
    -0.5,
    0.5, //左上角——v0
    -0.5,
    -0.5, //左下角——v0.5
    0.5,
    0.5, //右上角——v2
    0.5,
    -0.5, //右下角——v3
  ]);
  /**
   * 创建UV纹理坐标数据textureData
   **/
  var textureData = new Float32Array([
    0,
    1, //左上角——uv0
    0,
    0, //左下角——uv1
    1,
    1, //右上角——uv2
    1,
    0, //右下角——uv3
  ]);

  /**
   初始化函数initShader()
   **/
  function initShader(
    gl: any,
    vertexShaderSource: any,
    fragmentShaderSource: any
  ) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
  }
  var program = initShader(gl, vertexShaderSource, fragShaderSource);
  var a_Position = gl.getAttribLocation(program, "a_Position");
  var a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
  reverseUniform = gl.getUniformLocation(program, "reverse");
  var u_Sampler = gl.getUniformLocation(program, "u_Sampler");
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  /**
   创建缓冲区textureBuffer，向顶点着色器传入顶点纹理坐标数据textureData
   **/
  var textureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, textureData, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_TexCoord);
  let image: any = new Image();
  image.src = imgContent;
  image.crossOrigin = "anonymous";
  image.onload = function texture() {
    var texture = gl.createTexture(); //创建纹理图像缓冲区
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
    gl.activeTexture(gl.TEXTURE0); //激活0号纹理单元TEXTURE0
    gl.bindTexture(gl.TEXTURE_2D, texture); //绑定纹理缓冲区
    //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //以下配置就不需要要求图片的尺寸了
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    //设置纹素格式，jpg格式对应gl.RGB
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.uniform1f(reverseUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
}

export default Reverse;
