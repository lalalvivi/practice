import React from "react";
interface childProps {
  canvasWebgl: React.RefObject<HTMLCanvasElement>;
}
const Progress: React.FC<childProps> = (props: any) => {
  const { canvasWebgl } = props;
  const vertex = `
  attribute vec2 a_vertexPosition;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    gl_PointSize = 1.0;
    vUv = uv;
    gl_Position = vec4(a_vertexPosition, 1, 1);
  }
`;

  const fragment = `
  #ifdef GL_ES
  precision highp float;
  #endif
  varying vec2 vUv;
  uniform sampler2D tMap;
  uniform float uTime;
  float line_distance(in vec2 st, in vec2 a, in vec2 b) {
    vec3 ab = vec3(b - a, 0);
    vec3 p = vec3(st - a, 0);
    float l = length(ab);
    return cross(p, normalize(ab)).z;
  }
  void main() {
    vec4 color = texture2D(tMap, vUv);
    vec2 uv = vUv - vec2(0.5);
    vec2 a = vec2(0, 1);
    float time = 0.002 * uTime;
    vec2 b = vec2(sin(time), cos(time));
    float d = 0.0;
    float c0 = cross(vec3(b, 0.0), vec3(a, 0.0)).z;
    float c1 = cross(vec3(uv, 0.0), vec3(a, 0.0)).z;
    float c2 = cross(vec3(uv, 0.0), vec3(b, 0.0)).z;
    if(c0 > 0.0 && c1 > 0.0 && c2 < 0.0) {
      d = 1.0;
    }
    if(c0 < 0.0 && (c1 >= 0.0 || c2 <= 0.0)) {
      d = 1.0;
    }
    gl_FragColor.rgb = color.rgb;
    gl_FragColor.r *= mix(0.3, 1.0, d);
    gl_FragColor.a = mix(0.9, 1.0, d);
  }
`;

  const imgURL = "https://p4.ssl.qhimg.com/t011ce67c90abedcf12.jpg";
  function progress() {
    const canvas = canvasWebgl.current;
    const renderer = new GlRenderer(canvas);
    // load fragment shader and createProgram
    const program = renderer.compileSync(fragment, vertex);
    renderer.useProgram(program);

    (async function () {
      const texture = await renderer.loadTexture(imgURL);
      renderer.uniforms.tMap = texture;

      renderer.setMeshData([
        {
          positions: [
            [-0.5, -0.5],
            [-0.5, 0.5],
            [0.5, 0.5],
            [0.5, -0.5],
          ],
          attributes: {
            uv: [
              [0, 0],
              [0, 1],
              [1, 1],
              [1, 0],
            ],
          },
          cells: [
            [0, 1, 2],
            [2, 0, 3],
          ],
        },
      ]);

      renderer.render();

      function update(t: number) {
        renderer.uniforms.uTime = t;
        requestAnimationFrame(update);
      }
      update(0);
    })();
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          progress();
        }}
      >
        ??????????????????
      </button>
    </div>
  );
};

export default Progress;
