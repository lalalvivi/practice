// 三角形、矩形、直线、圆弧、贝塞尔、路径
const initState = {
  rotate: 0,
  globalAlpha: 1,
  color: "black",
  colors: "",
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
  shadowColor: "rgba(0, 0, 0, 0)",
  lineWidth: 1,
  lineJoin: "miter",
  lineCap: "butt",
  operation: "source-over",
  lineDashx: 4,
  lineDashy: 4,
  lineDashOffset: -4,
  sliderX1: 200,
  sliderY1: 200,
  scaleAll: 1,
};

function reducer(state: Object, action: any) {
  switch (action.type) {
    case "alpha":
      return {
        ...state,
        globalAlpha: action.globalAlpha,
      };
    case "shadowBlur":
      return {
        ...state,
        shadowBlur: action.shadowBlur,
      };
    case "shadowColor":
      return {
        ...state,
        shadowColor: action.shadowColor,
      };
    case "shadowOffsetX":
      return {
        ...state,
        shadowOffsetX: action.shadowOffsetX,
      };
    case "shadowOffsetY":
      return {
        ...state,
        shadowOffsetY: action.shadowOffsetY,
      };
    case "color":
      return {
        ...state,
        color: action.color,
      };
    case "colors":
      return {
        ...state,
        colors: action.colors,
      };
    case "lineDashx":
      return {
        ...state,
        lineDashx: action.lineDashx,
      };
    case "lineDashy":
      return {
        ...state,
        lineDashy: action.lineDashy,
      };
    case "lineDashOffset":
      return {
        ...state,
        lineDashOffset: action.lineDashOffset,
      };
    case "lineWidth":
      return {
        ...state,
        lineWidth: action.lineWidth,
      };
    case "lineCap":
      return {
        ...state,
        lineCap: action.lineCap,
      };
    case "lineJoin":
      return {
        ...state,
        lineJoin: action.lineJoin,
      };
    case "sliderX1":
      return {
        ...state,
        sliderX1: action.sliderX1,
      };
    case "sliderY1":
      return {
        ...state,
        sliderY1: action.sliderY1,
      };
    case "rotate":
      return {
        ...state,
        rotate: action.rotate,
      };
    case "scale":
      return {
        ...state,
        scaleAll: action.scaleAll,
      };
    case "source":
      return {
        ...state,
        operation: action.operation,
      };
    case "clear":
      return {
        ...state,
        rotate: 0,
        globalAlpha: 1,
        color: "black",
        colors: "",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: "rgba(0, 0, 0, 0)",
        lineWidth: 1,
        lineJoin: "miter",
        lineCap: "butt",
        operation: "source-over",
        lineDashx: 4,
        lineDashy: 4,
        lineDashOffset: -4,
        sliderX1: 200,
        sliderY1: 200,
        scaleAll: 1,
      };
    default:
      return state;
  }
}
//文字
const textState = {
  fontSize: 20,
  fontFamily: "serif",
  direction: "inherit",
  textAlign: "start",
  textBaseline: "alphabetic",
  textContent: "",
};
function textReducer(state: any, action: any) {
  switch (action.type) {
    case "textContent":
      return {
        ...state,
        textContent: action.textContent,
      };
    case "fontSize":
      return {
        ...state,
        fontSize: action.fontSize,
      };
    case "fontFamily":
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    case "textAlign":
      return {
        ...state,
        textAlign: action.textAlign,
      };
    case "textBaseline":
      return {
        ...state,
        textBaseline: action.textBaseline,
      };
    case "direction":
      return {
        ...state,
        direction: action.direction,
      };
    case "clear":
      return {
        ...state,
        fontSize: 20,
        fontFamily: "serif",
        direction: "inherit",
        textAlign: "start",
        textBaseline: "alphabetic",
        textContent: "",
      };
    default:
      return state;
  }
}
// 图片
const imgState = {
  scaleSlider: 1,
  sliderX: 1,
  sliderY: 1,
  imgContent:
    "https://cdn1.mihuiai.com/media/images/b7bb3b4a-4802-4c6a-b879-bd61db1ee675_thumb.png?x-oss-process=style/small",
};
function imgReducer(state: any, action: any) {
  switch (action.type) {
    case "imgContent":
      return {
        ...state,
        imgContent: action.imgContent,
      };
    case "scaleSlider":
      return {
        ...state,
        scaleSlider: action.scaleSlider,
      };
    case "sliderX":
      return {
        ...state,
        sliderX: action.sliderX,
      };
    case "sliderY":
      return {
        ...state,
        sliderY: action.sliderY,
      };
    case "clear":
      return {
        ...state,
        scaleSlider: 1,
        sliderX: 1,
        sliderY: 1,
        imgContent:
          "https://cdn1.mihuiai.com/media/images/b7bb3b4a-4802-4c6a-b879-bd61db1ee675_thumb.png?x-oss-process=style/small",
      };
    default:
      return state;
  }
}

export { initState, reducer, textState, textReducer, imgState, imgReducer };
