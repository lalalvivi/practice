import React, { useContext, useEffect, useState, useCallback } from "react";
var newScaleMap = ["nw", "ne", "n", "se", "w", "sw", "s", "nw"];
var scaleMap = ["e", "ne", "n", "nw", "w", "sw", "s", "se"];
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
  rotate: number,
  across: any,
  offset: any,
  originCenter: any
) {
  let scale;
  let fourControl: string[] = ["tl", "tr", "br", "bl"];
  let a: number = Math.round(rotate / 90);
  let b: any;
  let mouse: any;
  fourControl.filter((item, index) => {
    if (item === isControl) {
      b = index;
    }
  });
  let isControlRotate = fourControl[(a + b) % 4];
  console.log(isControl);
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
  function controlChange(control: any, isControlRotate: string) {
    switch (isControl) {
      case "tl":
        scale = (mouse.x + mouse.y) / (across.x + across.y);
        break;
      case "tr":
        scale = (mouse.x + mouse.y) / (across.x + across.y);
        break;
      case "br":
        scale = (mouse.x + mouse.y) / (across.x + across.y);
        break;
      case "bl":
        scale = (mouse.x + mouse.y) / (across.x + across.y);
        break;
      default:
        break;
    }
  }
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
//

export { CursorStyleHandler, acrossScale, vertical, centerScale };
// switch (isControl) {
//   case 'tl':
//     vert=vertical(offset,origin,tl);
//     scale=((y-vert.y)*2+sh)/sh;
//     break;
//   case 'tr':
//     vert=vertical(offset,origin,tr);
//     scale=((y-vert.y)*2+sh)/sh;
//     break;
//   case 'br':
//     vert=vertical(offset,origin,br);
//     scale=((y-vert.y)*2+sh)/sh;
//     break;
//   case 'bl':
//     vert=vertical(offset,origin,bl);
//     scale=((y-vert.y)*2+sh)/sh;
//     break;
//   default:
//     break;
// }
