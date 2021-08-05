import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  position,
  drawRect,
  getImageLines,
  findCrossPoints,
  controlPosition,
  rgba,
  drawBorder,
  drawImg,
} from "../control/imgRender";
import {
  CursorStyleHandler,
  acrossScale,
  vertical,
  centerScale,
} from "../control/controlStyle";
function MouseControl(
  name: string,
  changeControlRotate: Function,
  changeScaleX: Function,
  changeScaleY: Function,
  changeLeft: Function,
  changeTop: Function,
  canvas: any,
  ctx: any,
  rotate: number,
  sw: number,
  sh: number,
  x: number,
  y: number,
  isTransparent: boolean,
  sliderx?: number,
  slidery?: number,
  w?: number,
  h?: number,
  scaleSlider?: number,
  howRotate?: string,
  img?: HTMLImageElement
) {
  var clickFlag = false;
  var isControl: string = "move";

  var controlRt = 0;
  let OriginSh: number;
  let OriginSw: number;
  if (h && w && scaleSlider) {
    OriginSh = h * scaleSlider;
    OriginSw = w * scaleSlider;
  }
  // 鼠标按下操作
  canvas.onmousedown = function (e: any) {
    let coords = position(sw + 20, sh + 20, x - 10, y - 10, rotate);
    let lines = getImageLines(coords);
    let points = { x: e.offsetX, y: e.offsetY };
    let xPoints = findCrossPoints(points, lines);
    if ((xPoints !== 0 && xPoints % 2 === 1) || isControl) {
      var Transparent = rgba(e.offsetX, e.offsetY, ctx);
      // 鼠标按在指定区域并且有像素不实现放大缩小
      if (Transparent || isTransparent) {
        isControl = "move";
        clickFlag = true;
        drawBorder(ctx, rotate, x, y, sw, sh);
      }
      // 鼠标按在没有像素的区域
      else {
        clickFlag = false;
        isControl = "move";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ChooseCase(name, controlRt, x, y);
      }
    }
    // 鼠标按住指定区域外
    else {
      clickFlag = false;
      isControl = "move";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ChooseCase(name, controlRt, x, y);
    }
  };
  // 鼠标移动操作
  canvas.onmousemove = function (e: any) {
    // 鼠标按下拖拽操作
    if (e.which === 1 && clickFlag && isControl === "move") {
      x = x + e.movementX;
      y = y + e.movementY;
      changeLeft(x);
      changeTop(y);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ChooseCase(name, controlRt, x, y);
      drawBorder(ctx, rotate, x, y, sw, sh);
    }
    // 十个坐标点坐标区域
    const { tr, tl, bl, br, lm, tm, rm, bm } = controlArea(
      e,
      x,
      y,
      sw,
      sh,
      rotate
    );
    // 鼠标变换
    controlChange(e, x, y, sw, sh, canvas, rotate, clickFlag, isControl);
    console.log(isControl);
    isControl = controlChange(
      e,
      x,
      y,
      sw,
      sh,
      canvas,
      rotate,
      clickFlag,
      isControl
    );
    console.log(isControl);
    // 鼠标拖动放大缩小
    controlScaleChange(e, x, y, sw, sh, OriginSh, OriginSw, rotate, isControl);
    ChooseCase(name, controlRt, x, y);
    // changeScaleX(ScaleXChange);
    // changeScaleY(ScaleYChange);
    changeLeft(x);
    changeTop(y);
    drawBorder(ctx, rotate + controlRt, x, y, sw, sh);
    // controlArea(e, x, y, sw, sh);
  };
  // 图片或者矩形选择
  function ChooseCase(name: string, controlRt: number, x: number, y: number) {
    switch (name) {
      case "img":
        if (img && sliderx && slidery && w && h) {
          drawImg(
            canvas,
            img,
            ctx,
            rotate + controlRt,
            x,
            y,
            sw,
            sh,
            sliderx,
            slidery,
            w,
            h
          );
        }
        break;
      case "rect":
        drawRect(canvas, ctx, rotate, x, y, sw, sh);
        break;
      default:
        break;
    }
  }
}

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
// 鼠标拖动放大缩小
function controlScaleChange(
  e: any,
  x: number,
  y: number,
  sw: number,
  sh: number,
  OriginSh: number,
  OriginSw: number,
  rotate: number,
  isControl: string
) {
  const {
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
  } = controlArea(e, x, y, sw, sh, rotate);
  const OriginXy: number = sh / sw;
  const MaxScaleX: number = 2;
  const MaxScaleY: number = 2;
  const MinScaleX: number = 0.1;
  const MinScaleY: number = 0.1;
  var scale: any;
  var across, center, offset, origin, originCenter;
  let vert;
  across = { tl, tr, bl, br };
  center = { tm, rm, bm, lm };
  offset = { x: e.offsetX, y: e.offsetY };
  origin = { x: x + sw / 2, y: y + sh / 2 };
  originCenter = { x: x + sw / 2, y: y + sh / 2 };
  if (e.which === 1 && isControl != "move" && e.offsetX > 0 && e.offsetY > 0) {
    if (
      isControl == "tm" ||
      isControl == "rm" ||
      isControl == "bm" ||
      isControl == "lm"
    ) {
      console.log(7924723874);

      // scale = 1;
      // scale = centerScale(isControl, rotate, center, offset);
    } else if (isControl == "rotate") {
      // controlRt = 10;
      // changeControlRotate(controlRt);
    } else {
      scale = acrossScale(isControl, rotate, across, offset, originCenter);
    }
    if (isControl != "rotate") {
      console.log(scale);

      sh = sh * scale.y;
      sw = sw * scale.x;
      x = x + (sw * (1 - scale.x)) / 2;
      y = y + (sh * (1 - scale.y)) / 2;
    }
    let ScaleXChange = sw / OriginSw;
    let ScaleYChange = sh / OriginSh;
    if (
      ScaleXChange > MaxScaleX ||
      ScaleYChange > MaxScaleY ||
      ScaleXChange < MinScaleX ||
      ScaleYChange < MinScaleY
    ) {
      return;
    }
    return { ScaleXChange, ScaleYChange };
  }
}

export { MouseControl };
