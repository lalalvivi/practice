import { controlPosition, position } from "./imgRender";
var scaleMap = ["e", "ne", "n", "nw", "w", "sw", "s", "se"];
//控制器区域
function controlArea(
  e: any,
  x: number,
  y: number,
  sw: number,
  sh: number,
  rotate: number
) {
  let tr: any,
    tl: any,
    bl: any,
    br: any,
    lm: any,
    tm: any,
    rm: any,
    bm: any,
    xPointsTl: any,
    xPointsTm: any,
    xPointsTr: any,
    xPointsRm: any,
    xPointsBr: any,
    xPointsBm: any,
    xPointsBl: any,
    xPointsLm: any,
    xPointsT: any;
  // 上左
  tl = position(sw + 20, sh + 20, x - 10, y - 10, rotate).tl;
  let coordsTl = position(10, 10, tl.x - 5, tl.y - 5, rotate);
  let points = { x: e.offsetX, y: e.offsetY };
  xPointsTl = controlPosition(coordsTl, points);
  // 上右
  tr = position(sw + 20, sh + 20, x - 10, y - 10, rotate).tr;
  let coordsTr = position(10, 10, tr.x - 5, tr.y - 5, rotate);
  xPointsTr = controlPosition(coordsTr, points);
  // 上中
  tm = { x: (tr.x - tl.x) / 2 + tl.x - 5, y: (tr.y - tl.y) / 2 + tl.y - 5 };
  let coordsTm = position(
    10,
    10,
    (tr.x - tl.x) / 2 + tl.x - 5,
    (tr.y - tl.y) / 2 + tl.y - 5,
    rotate
  );
  xPointsTm = controlPosition(coordsTm, points);
  // 下左
  bl = position(sw + 20, sh + 20, x - 10, y - 10, rotate).bl;
  let coordsBl = position(10, 10, bl.x - 5, bl.y - 5, rotate);
  xPointsBl = controlPosition(coordsBl, points);
  // 下右
  br = position(sw + 20, sh + 20, x - 10, y - 10, rotate).br;
  let coordsBr = position(10, 10, br.x - 5, br.y - 5, rotate);
  xPointsBr = controlPosition(coordsBr, points);
  // 下中
  bm = { x: (br.x - bl.x) / 2 + bl.x - 5, y: (br.y - bl.y) / 2 + bl.y - 5 };
  let coordsBm = position(
    10,
    10,
    (br.x - bl.x) / 2 + bl.x - 5,
    (br.y - bl.y) / 2 + bl.y - 5,
    rotate
  );
  xPointsBm = controlPosition(coordsBm, points);
  // 最上
  var a = (tr.x - tl.x) / 2 + tl.x - 5;
  var b = (tr.y - tl.y) / 2 + tl.y - 5;
  let coordsT = position(
    10,
    10,
    a + 35 * Math.sin((rotate * Math.PI) / 180),
    b - 35 * Math.cos((rotate * Math.PI) / 180),
    rotate
  );
  xPointsT = controlPosition(coordsT, points);
  // 左中
  lm = { x: (tl.x - bl.x) / 2 + bl.x - 5, y: (tl.y - bl.y) / 2 + bl.y - 5 };
  let coordsLm = position(
    10,
    10,
    (tl.x - bl.x) / 2 + bl.x - 5,
    (tl.y - bl.y) / 2 + bl.y - 5,
    rotate
  );
  xPointsLm = controlPosition(coordsLm, points);
  // 右中
  rm = { x: (tr.x - br.x) / 2 + br.x - 5, y: (tr.y - br.y) / 2 + br.y - 5 };
  let coordsRm = position(
    10,
    10,
    (tr.x - br.x) / 2 + br.x - 5,
    (tr.y - br.y) / 2 + br.y - 5,
    rotate
  );
  xPointsRm = controlPosition(coordsRm, points);
  return {
    tr,
    tl,
    bl,
    br,
    lm,
    tm,
    rm,
    bm,
    xPointsTl,
    xPointsTm,
    xPointsTr,
    xPointsRm,
    xPointsBr,
    xPointsBm,
    xPointsBl,
    xPointsLm,
    xPointsT,
  };
}
// 控制器鼠标变换
function controlChange(
  e: any,
  x: number,
  y: number,
  sw: number,
  sh: number,
  canvas: any,
  rotate: number,
  clickFlag: boolean,
  isControl: string
) {
  const {
    xPointsTl,
    xPointsTm,
    xPointsTr,
    xPointsRm,
    xPointsBr,
    xPointsBm,
    xPointsBl,
    xPointsLm,
    xPointsT,
  } = controlArea(e, x, y, sw, sh, rotate);
  if (clickFlag && xPointsTl !== 0 && xPointsTl % 2 === 1) {
    console.log("上左");
    // canvas.style.cursor='nw-resize';
    let tl1 = { x: -sw / 2, y: sh / 2 };
    canvas.style.cursor = CursorStyleHandler(rotate, tl1);
    isControl = "tl";
  } else if (clickFlag && xPointsTm !== 0 && xPointsTm % 2 === 1) {
    console.log("上中");
    // canvas.style.cursor='n-resize';
    isControl = "tm";
    let tm1 = { x: 0, y: sh / 2 };
    canvas.style.cursor = CursorStyleHandler(rotate, tm1);
  } else if (clickFlag && xPointsTr !== 0 && xPointsTr % 2 === 1) {
    console.log("上右");
    isControl = "tr";
    // canvas.style.cursor='ne-resize';
    let tr1 = { x: sw / 2, y: sh / 2 };
    canvas.style.cursor = CursorStyleHandler(rotate, tr1);
  } else if (clickFlag && xPointsRm !== 0 && xPointsRm % 2 === 1) {
    console.log("右中");
    isControl = "rm";
    // canvas.style.cursor='e-resize';
    let rm1 = { x: sw / 2, y: 0 };
    canvas.style.cursor = CursorStyleHandler(rotate, rm1);
  } else if (clickFlag && xPointsBr !== 0 && xPointsBr % 2 === 1) {
    console.log("下右");
    isControl = "br";
    let br1 = { x: sw / 2, y: -sh / 2 };
    canvas.style.cursor = CursorStyleHandler(rotate, br1);
    // canvas.style.cursor='se-resize';
  } else if (clickFlag && xPointsBm !== 0 && xPointsBm % 2 === 1) {
    console.log("下中");
    isControl = "bm";
    let bm1 = { x: 0, y: -sh / 2 };
    canvas.style.cursor = CursorStyleHandler(rotate, bm1);
    // canvas.style.cursor='s-resize';
  } else if (clickFlag && xPointsBl !== 0 && xPointsBl % 2 === 1) {
    console.log("下左");
    isControl = "bl";
    let bl1 = { x: -sw / 2, y: -sh / 2 };
    console.log(bl1, sw, sh, rotate);
    canvas.style.cursor = CursorStyleHandler(rotate, bl1);
    // canvas.style.cursor='sw-resize';
  } else if (clickFlag && xPointsLm !== 0 && xPointsLm % 2 === 1) {
    console.log("左中");
    isControl = "lm";
    let lm1 = { x: -sw / 2, y: 0 };
    canvas.style.cursor = CursorStyleHandler(rotate, lm1);
    // canvas.style.cursor='w-resize';
  } else if (clickFlag && xPointsT !== 0 && xPointsT % 2 === 1) {
    console.log("最上");
    isControl = "rotate";
    canvas.style.cursor = "crosshair";
  } else {
    canvas.style.cursor = "default";
  }
  return isControl;
}
// 鼠标变换
function CursorStyleHandler(rotate: number, control: { x: number; y: number }) {
  var n = findCornerQuadrant(rotate, control);
  return scaleMap[n % 8] + "-resize";
}
// 控制器角度旋转
function findCornerQuadrant(rotate: number, control: { x: number; y: number }) {
  var cornerAngle =
    -rotate + (Math.atan2(control.y, control.x) / Math.PI) * 180 + 720;
  return Math.round((cornerAngle % 360) / 45);
}
// 对角拖动放大缩小
function acrossScale(
  isControl: string,
  across: any,
  offset: any,
  originCenter: any
) {
  let scale;
  let mouse: any;
  // 鼠标与原点相对坐标
  mouse = {
    x: Math.abs(offset.x - originCenter.x),
    y: Math.abs(offset.y - originCenter.y),
  };
  switch (isControl) {
    case "tl":
      scale =
        (mouse.x + mouse.y) /
        (Math.abs(across.tl.x - originCenter.x) +
          Math.abs(across.tl.y - originCenter.y));
      break;
    case "tr":
      scale =
        (mouse.x + mouse.y) /
        (Math.abs(across.tr.x - originCenter.x) +
          Math.abs(across.tr.y - originCenter.y));
      break;
    case "br":
      scale =
        (mouse.x + mouse.y) /
        (Math.abs(across.br.x - originCenter.x) +
          Math.abs(across.br.y - originCenter.y));
      break;
    case "bl":
      scale =
        (mouse.x + mouse.y) /
        (Math.abs(across.bl.x - originCenter.x) +
          Math.abs(across.bl.y - originCenter.y));
      break;
    default:
      break;
  }
  return { x: scale, y: scale };
}
// 四个中心点拖动放大缩小
function centerScale(
  isControl: string,
  rotate: number,
  center: any,
  offset: any
) {
  let scale;
  let x, y;
  let fourControl: string[] = ["tm", "rm", "bm", "lm"];
  let a: number = Math.round(rotate / 90);
  let b: any;
  fourControl.filter((item, index) => {
    if (item === isControl) {
      b = index;
    }
  });
  let isControlRotate = fourControl[(a + b) % 4];
  console.log(isControl);

  switch (isControl) {
    case "tm":
      x = 1;
      y = controlChange(center.tm, isControlRotate);
      scale = { x: x, y: y };
      break;
    case "rm":
      y = 1;
      x = controlChange(center.rm, isControlRotate);
      scale = { x: x, y: y };
      break;
    case "bm":
      x = 1;
      y = controlChange(center.bm, isControlRotate);
      scale = { x: x, y: y };
      break;
    case "lm":
      y = 1;
      x = controlChange(center.lm, isControlRotate);
      scale = { x: x, y: y };
      break;
    default:
      break;
  }
  return scale;
  function controlChange(control: any, isControlRotate: string) {
    let a;
    switch (isControlRotate) {
      case "tm":
        a = control.y / offset.y;
        break;
      case "rm":
        a = offset.x / control.x;
        break;
      case "bm":
        a = offset.y / control.y;
        break;
      case "lm":
        a = control.x / offset.x;
        break;
      default:
        break;
    }
    return a;
  }
}
// 垂直交点
function vertical(point: any, pnt1: any, pnt2: any) {
  let A = pnt2.y - pnt1.y;
  let B = pnt1.x - pnt2.x;
  let C = pnt2.x * pnt1.y - pnt1.x * pnt2.y;
  let x, y;
  let fPoint = { x: 1, y: 1 };
  if (A * A + B * B < 1e-13) {
    return pnt1; //pnt1与pnt2重叠
  } else if (Math.abs(A * point.x + B * point.y + C) < 1e-13) {
    return point; //point在直线上(pnt1_pnt2)
  } else {
    x = (B * B * point.x - A * B * point.y - A * C) / (A * A + B * B);
    y = (-A * B * point.x + A * A * point.y - B * C) / (A * A + B * B);
    fPoint.x = x;
    fPoint.y = y;
    return fPoint;
  }
}
// 控制器最上旋转
function controlTRotate(originCenter: any, offset: any, rotate: number) {
  let angle =
    ((Math.atan2(offset.x - originCenter.x, originCenter.y - offset.y) /
      Math.PI) *
      180 +
      360 -
      rotate) %
    360;
  return angle;
}
export {
  controlArea,
  controlChange,
  CursorStyleHandler,
  acrossScale,
  vertical,
  centerScale,
  controlTRotate,
};
