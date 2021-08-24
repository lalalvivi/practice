import React, { useEffect, useState, useCallback } from "react";
import { MouseControl } from "../control/mouseControl";
const ImgContent = (props: any) => {
  const { ctx, canvasAll, state, imageState, turn, changeTurn, imgDispatch } =
    props;
  const { rotate, operation } = state;
  const { scaleSlider, sliderX, sliderY, imgContent } = imageState;
  const [left, setLeft] = useState<number>(200);
  const [top, setTop] = useState<number>(200);
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);
  const [controlRotate, setControlRotate] = useState<number>(0);
  const changeLeft = useCallback((code: number) => {
    setLeft(code);
  }, []);
  const changeTop = useCallback((code: number) => {
    setTop(code);
  }, []);
  const changeScaleX = useCallback((code: number) => {
    setScaleX(code);
  }, []);
  const changeScaleY = useCallback((code: number) => {
    setScaleY(code);
  }, []);
  const changeControlRotate = useCallback((code: number) => {
    setControlRotate(code);
  }, []);
  useEffect(() => {
    if (turn === "img") {
      draw();
    }
    //处理异步数据
  }, [state, imageState]);
  function draw() {
    changeTurn("img");
    let canvas: any = canvasAll.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    function drawImage() {
      var w = img.width;
      var h = img.height;
      var sw = w * scaleSlider * scaleX;
      var sh = h * scaleSlider * scaleY;
      ctx.globalCompositeOperation = operation;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(left + sw / 2, top + sh / 2);
      ctx.rotate(((rotate + controlRotate) * Math.PI) / 180);
      ctx.translate(-left - sw / 2, -top - sh / 2);
      ctx.drawImage(img, sliderX, sliderY, w, h, left, top, sw, sh);
      ctx.restore();
      let x = left,
        y = top;
      let isTransparent = false;
      let howRotate = "center";
      MouseControl(
        "img",
        changeControlRotate,
        changeScaleX,
        changeScaleY,
        changeLeft,
        changeTop,
        canvas,
        ctx,
        rotate,
        controlRotate,
        sw,
        sh,
        x,
        y,
        isTransparent,
        sliderX,
        sliderY,
        w,
        h,
        scaleSlider,
        howRotate,
        img
      );
    }
    img.crossOrigin = "anonymous";
    img.src = imgContent;
    img.onload = function (e) {
      drawImage();
    };
  }
  return (
    <div>
      <input
        type="text"
        placeholder="输入图片地址"
        value={imgContent}
        onChange={(e) =>
          imgDispatch({ type: "imgContent", imgContent: e.target.value })
        }
      ></input>
      <div>
        <button
          type="button"
          onClick={() => {
            draw();
          }}
        >
          添加图片
        </button>
      </div>
    </div>
  );
};
export default ImgContent;
