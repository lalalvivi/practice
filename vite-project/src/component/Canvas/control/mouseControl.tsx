import {
  position,
  drawRect,
  getImageLines,
  findCrossPoints,
  rgba,
  drawBorder,
  drawImg,
} from "./imgRender";
import {
  acrossScale,
  centerScale,
  controlChange,
  controlArea,
  controlTRotate,
} from "./controlStyle";
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
  controlRotate: number,
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
        drawBorder(ctx, rotate + controlRotate, x, y, sw, sh);
      }
      // 鼠标按在没有像素的区域
      else {
        clickFlag = false;
        isControl = "move";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ChooseCase(name, controlRotate, rotate, x, y, sh, sw);
      }
    }
    // 鼠标按住指定区域外
    else {
      clickFlag = false;
      isControl = "move";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ChooseCase(name, controlRotate, rotate, x, y, sh, sw);
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
      ChooseCase(name, controlRotate, rotate, x, y, sh, sw);
      drawBorder(ctx, controlRotate + rotate, x, y, sw, sh);
    }
    if (isControl === "move" || isControl === "over" || e.which != 1) {
      // 鼠标变换
      console.log(isControl);

      isControl = controlChange(
        e,
        x,
        y,
        sw,
        sh,
        canvas,
        rotate + controlRotate,
        clickFlag,
        isControl
      );
    }
    controlScaleChange();
    // 鼠标拖动放大缩小
    function controlScaleChange() {
      const { tr, tl, bl, br, lm, tm, rm, bm } = controlArea(
        e,
        x,
        y,
        sw,
        sh,
        rotate + controlRotate
      );
      const MaxScaleX: number = 2;
      const MaxScaleY: number = 2;
      const MinScaleX: number = 0.1;
      const MinScaleY: number = 0.1;
      var scale: any;
      var ScaleXChange: number;
      var ScaleYChange: number;
      var across, center, offset, origin, originCenter;
      across = { tl, tr, bl, br };
      center = { tm, rm, bm, lm };
      offset = { x: e.offsetX, y: e.offsetY };
      origin = { x: x + sw / 2, y: y + sh / 2 };
      originCenter = { x: x + sw / 2, y: y + sh / 2 };
      if (
        e.which === 1 &&
        isControl != "move" &&
        e.offsetX > 0 &&
        e.offsetY > 0
      ) {
        // 绕着中心点变形缩放
        if (
          isControl == "tm" ||
          isControl == "rm" ||
          isControl == "bm" ||
          isControl == "lm"
        ) {
          scale = centerScale(
            isControl,
            rotate + controlRotate,
            center,
            offset
          );
        }
        // 拖拽旋转
        else if (isControl == "rotate") {
          controlRotate = controlTRotate(originCenter, offset, rotate);
          changeControlRotate(controlRotate);
        }
        // 绕着中心点等比缩放
        else {
          scale = acrossScale(isControl, across, offset, originCenter);
        }
        ScaleXChange = sw / OriginSw;
        ScaleYChange = sh / OriginSh;
        if (isControl != "rotate") {
          if (
            ScaleXChange <= MaxScaleX &&
            ScaleXChange >= MinScaleX &&
            ScaleYChange <= MaxScaleY &&
            ScaleYChange >= MinScaleY
          ) {
            scaleXy();
          } else if (scale.x < 1 && ScaleXChange > MaxScaleX) {
            scaleXy();
          } else if (scale.y < 1 && ScaleYChange > MaxScaleY) {
            scaleXy();
          } else if (scale.x > 1 && ScaleXChange < MinScaleX) {
            scaleXy();
          } else if (scale.y > 1 && ScaleYChange < MinScaleY) {
            scaleXy();
          } else {
            return;
          }
        }
        // 在比例范围内拖拽放大
        function scaleXy() {
          sh = sh * scale.y;
          sw = sw * scale.x;
          x = x + (sw * (1 - scale.x)) / 2;
          y = y + (sh * (1 - scale.y)) / 2;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ChooseCase(name, controlRotate, rotate, x, y, sh, sw);
        changeScaleX(ScaleXChange);
        changeScaleY(ScaleYChange);
        changeLeft(x);
        changeTop(y);
        drawBorder(ctx, rotate + controlRotate, x, y, sw, sh);
        // controlArea(e, x, y, sw, sh, rotate);
      }
    }
  };
  // 鼠标松开操作
  canvas.onmouseup = function (e: any) {
    // 松开置为over
    isControl = "over";
  };
  // 图片或者矩形选择
  function ChooseCase(
    name: string,
    controlRotate: number,
    rotate: number,
    x: number,
    y: number,
    sh: number,
    sw: number
  ) {
    switch (name) {
      case "img":
        if (img && sliderx && slidery && w && h) {
          drawImg(
            canvas,
            img,
            ctx,
            rotate + controlRotate,
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

export { MouseControl };
