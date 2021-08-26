import React from "react";
function Filter() {
  const canvasWebgl = React.useRef<HTMLCanvasElement>(null);
  let imgContent =
    "https://img0.baidu.com/it/u=1242053365,2901037121&fm=26&fmt=auto&gp=0.jpg";
  let gl: any,
    saturationUniform: any,
    rUniform: any,
    gUniform: any,
    bUniform: any,
    blackWhiteUniform: any,
    reverseUniform: any,
    oldUniform: any;
  //顶点着色器源码
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
  uniform float saturation;
  uniform bool blackWhite;
  uniform bool reverse;
  uniform bool old;
  uniform float r;
  uniform float g;
  uniform float b;
  uniform float a;
  void main(){ 
  //采集纹素
  vec4 texture = texture2D(u_Sampler,v_TexCoord);
            texture.r += r; // 图片整体 r 值
            texture.g += g; // 图片整体 g 值
            texture.b += b; // 图片整体 b 值
            // texture.a = 0.5; // 图片整体 a 值

            //内阴影
            // float dist = distance(textureCoordinate, vec2(0.5, 0.5));
            // texture.rgb *= smoothstep(0.8, size * 0.799, dist * (1.0 + size));

            //饱和度
            float average = (texture.r + texture.g + texture.b) / 3.0;
            if (saturation > 0.0) {
                texture.rgb += (average - texture.rgb) * (1.0 - 1.0 / (1.001 - saturation));
            } else {
                texture.rgb += (average - texture.rgb) * (-saturation);
            }
            //黑白滤镜
            if(blackWhite){         
                if(average >=0.5){
                  texture.b=texture.g=texture.r = 0.0;  
                }
                else{
                  texture.b=texture.g=texture.r = 1.0;  
                }
            };
            //反向滤镜
            if(reverse){        
                  texture.b=1.0- texture.b;
                  texture.g=1.0- texture.g;
                  texture.r=1.0- texture.r;
            };
            //怀旧滤镜
            if(old){        
              texture.r=0.393*texture.r+0.769*texture.g+0.189*texture.b;
              texture.g=0.349*texture.r+0.686*texture.g+0.168*texture.b;
              texture.b=0.272*texture.r+0.534*texture.g+0.131*texture.b;
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
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
  }
  function add() {
    var canvas: any = canvasWebgl.current;
    gl = canvas.getContext("webgl");
    var program = initShader(gl, vertexShaderSource, fragShaderSource);
    var a_Position = gl.getAttribLocation(program, "a_Position");
    var a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
    saturationUniform = gl.getUniformLocation(program, "saturation");
    rUniform = gl.getUniformLocation(program, "r");
    gUniform = gl.getUniformLocation(program, "g");
    bUniform = gl.getUniformLocation(program, "b");
    blackWhiteUniform = gl.getUniformLocation(program, "blackWhite");
    reverseUniform = gl.getUniformLocation(program, "reverse");
    oldUniform = gl.getUniformLocation(program, "old");
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
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
  }
  function rChange(e: any) {
    let val = Number(e.target.value) / 100;
    gl.uniform1f(rUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function gChange(e: any) {
    let val = Number(e.target.value) / 100;
    gl.uniform1f(gUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function bChange(e: any) {
    let val = Number(e.target.value) / 100;
    gl.uniform1f(bUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function sChange(e: any) {
    let val = Number(e.target.value) / 100;
    gl.uniform1f(saturationUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function bwChange(e: any) {
    let val = e.target.checked;
    gl.uniform1f(blackWhiteUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function reverseChange(e: any) {
    let val = e.target.checked;
    gl.uniform1f(reverseUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function oldChange(e: any) {
    let val = e.target.checked;
    gl.uniform1f(oldUniform, val);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  return (
    <div className="all">
      <div className="left">
        <input
          type="text"
          placeholder="输入图片地址"
          defaultValue={imgContent}
          onChange={(e) => {
            imgContent = e.target.value;
          }}
        ></input>
        <button
          type="button"
          onClick={() => {
            add();
          }}
        >
          添加图片
        </button>
        <div className="slider">
          <label>饱和度:</label>
          <input type="range" defaultValue="0" onChange={sChange} />
        </div>

        <div className="slider">
          <label>R:</label>
          <input type="range" defaultValue="0" onChange={rChange} />
        </div>

        <div className="slider">
          <label>G:</label>
          <input type="range" defaultValue="0" onChange={gChange} />
        </div>

        <div className="slider">
          <label>B:</label>
          <input type="range" defaultValue="0" onChange={bChange} />
        </div>
        <div className="check">
          <input type="checkbox" onChange={bwChange} />
          <span>黑白滤镜</span>
        </div>
        <div className="check">
          <input type="checkbox" onChange={reverseChange} />
          <span>反向滤镜</span>
        </div>
        <div className="check">
          <input type="checkbox" onChange={oldChange} />
          <span>怀旧滤镜</span>
        </div>
      </div>
      <div className="right">
        <canvas
          id="canvas"
          className="canvas"
          width="800"
          height="800"
          ref={canvasWebgl}
        ></canvas>
      </div>
    </div>
  );
}

export default Filter;
