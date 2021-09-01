import React, { useState, useEffect, useRef } from "react";
import "./mouse.scss";
let fabric = window.fabric;
import { Checkbox, Row } from "antd";
function Fabric() {
  const [status, setStatus] = useState<boolean>(true);
  const [filterValues, setFilterValues] = useState<any>([]);
  const [Noise, setNoise] = useState<number>(0);
  const [Saturation, setSaturation] = useState<number>(0);
  const [Hue, setHue] = useState<number>(0);
  const canvasRef = useRef(null);
  const canvasWebgl = React.useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    initCanvas();
  }, [status]);
  useEffect(() => {
    chooseFilter();
  }, [filterValues, Noise, Hue, Saturation]);
  let canvas: any;
  let imgContent =
    "https://img0.baidu.com/it/u=1242053365,2901037121&fm=26&fmt=auto&gp=0.jpg";
  let points: any = [];
  let brushStyle = "PencilBrush";
  let lineSize = 5;
  let lineColor = "black";
  let shadowColor = "black";
  let width = 0;
  let height = 0;
  var selectTool: any = []; // 当前用户选择的绘图工具
  var mouseFrom: any = {}; // 鼠标绘制起点
  var mouseTo: any = {}; // 鼠标绘制终点
  var drawingObject: any = null; // 保存鼠标未松开时用户绘制的临时图像
  var textObject: any = null; // 保存用户创建的文本对象
  var isDrawing = false; // 当前是否正在绘制图形（画笔，文本模式除外）
  // 初始化画布
  function initCanvas() {
    // 初始化 fabric canvas对象
    if (!canvas) {
      canvas = canvasRef.current
        ? canvasRef.current
        : new fabric.Canvas("canvas");
      canvasRef.current = canvas;
      // 禁止用户进行组选择
      canvas.selection = true;
      // 设置当前鼠标停留在
      canvas.hoverCursor = "default";
      // 重新渲染画布
      canvas.renderAll();
      objectChoose();
    }
  }

  // 初始化画布事件
  function initCanvasEvent() {
    // 操作类型集合
    let toolTypes = ["polyline", "rect", "circle", "text", "img"];
    // 监听鼠标按下事件
    canvas.on("mouse:down", (options: any) => {
      mouseFrom.x = options.e.offsetX;
      mouseFrom.y = options.e.offsetY;
      if (selectTool != "text" && textObject) {
        // 如果当前存在文本对象，并且不是进行添加文字操作 则 退出编辑模式，并删除临时的文本对象
        // 将当前文本对象退出编辑模式
        textObject.exitEditing();
        textObject.set("backgroundColor", "rgba(0,0,0,0)");
        if (textObject.text == "") {
          canvas.remove(textObject);
        }
        canvas.renderAll();
        textObject = null;
      }
      if (toolTypes.indexOf(selectTool) != -1) {
        // 判断当前选择的工具是否为文本
        if (selectTool == "text") {
          // 文本工具初始化
          initText();
        } else {
          // 设置当前正在进行绘图 或 移动操作
          isDrawing = true;
        }
      }
    });
    // 监听鼠标移动事件
    canvas.on("mouse:move", (options: any) => {
      // 如果当前正在进行绘图或移动相关操作
      if (isDrawing) {
        mouseTo.x = options.e.offsetX;
        mouseTo.y = options.e.offsetY;
        width = mouseTo.x - mouseFrom.x;
        height = mouseTo.y - mouseFrom.y;
        switch (selectTool) {
          case "polyline":
            // 当前绘制折线，初始化折线绘制
            initPolyline();
            break;
          case "rect":
            // 初始化 矩形绘制
            initRect();
            break;
          case "circle":
            // 初始化 绘制圆形
            initCircle();
            break;
        }
      }
    });
    // 监听鼠标松开事件
    canvas.on("mouse:up", () => {
      // 如果当前正在进行绘图或移动相关操作
      if (isDrawing) {
        // 清空鼠标移动时保存的临时绘图对象
        drawingObject = null;
        // 重置正在绘制图形标志
        isDrawing = false;
        // 清空鼠标保存记录
        resetMove();
      }
    });
  }
  // 初始化 绘制折线
  function initPolyline() {
    points = [
      { x: mouseFrom.x, y: mouseFrom.y },
      { x: mouseTo.x, y: mouseTo.y },
    ];
    let canvasObject = new fabric.Polyline(points, {
      fill: undefined,
      stroke: "black",
    });
    // 绘制 图形对象
    startDrawingObject(canvasObject);
  }
  // 初始化 绘制矩形
  function initRect() {
    // 创建矩形 对象
    let canvasObject = new fabric.Rect({
      left: mouseFrom.x,
      top: mouseFrom.y,
      fill: "",
      stroke: "black",
      width: width,
      height: height,
    });
    // 绘制矩形
    startDrawingObject(canvasObject);
  }
  // 初始化绘制圆形
  function initCircle() {
    // 计算圆形半径
    let radius =
      Math.abs(width) > Math.abs(height)
        ? Math.abs(width) / 2
        : Math.abs(height) / 2;
    // 创建 原型对象
    let canvasObject = new fabric.Circle({
      left: mouseFrom.x,
      top: mouseFrom.y,
      radius: radius,
      fill: "red", //填充的颜色
      stroke: "orange", // 边框颜色
      // strokeWidth: 5, // 边框
    });
    // 绘制圆形对象
    startDrawingObject(canvasObject);
  }
  // 初始化文本工具
  function initText() {
    if (!textObject) {
      // 当前不存在绘制中的文本对象
      // 创建文本对象
      textObject = new fabric.Textbox("", {
        left: mouseFrom.x,
        top: mouseFrom.y,
        fontFamily: "Comic Sans",
        width: width,
        height: height,
        fill: "red",
        strokeUniform: true,
        stroke: "green",
        borderColor: "red",
        editingBorderColor: "blue",
        hasControls: false,
        padding: 2,
        absolutePositioned: true,
        // editable: true,
        backgroundColor: "#fff",
        selectable: false,
      });
      canvas.add(textObject);
      // 文本打开编辑模式
      textObject.enterEditing();
      // 文本编辑框获取焦点
      textObject.hiddenTextarea.focus();
    } else {
      // 将当前文本对象退出编辑模式
      textObject.exitEditing();
      textObject.set("backgroundColor", "rgba(0,0,0,0)");
      if (textObject.text == "") {
        canvas.remove(textObject);
      }
      canvas.renderAll();
      textObject = null;
      return;
    }
  }
  // 画图
  function initImg() {
    selectTool = "img";
    fabric.util.loadImage(
      imgContent,
      (imgObj: any) => {
        const img = new fabric.Image(imgObj);
        img.scale(0.5);
        canvas.add(img);
      },
      null,
      "anonymous"
    );
  }
  //滤镜修改
  function filterChange(checkedValues: any) {
    setFilterValues(checkedValues);
    // chooseFilter();
  }
  // 监听对象选中取消事件
  function objectChoose() {
    // 监听对象被选中事件
    canvas.on("selection:created", (options: any) => {
      setStatus(false);
    });
    canvas.on("selection:cleared", (options: any) => {
      setStatus(true);
    });
  }
  // 选择滤镜
  function chooseFilter() {
    initCanvas();
    let drawObjects = canvas.getActiveObjects();
    if (drawObjects.length > 0) {
      drawObjects.map((item: any) => {
        if (item.type == "image") {
          item.filters = [];

          for (var i of filterValues) {
            switch (i) {
              case "Saturation":
                item.filters.push(
                  new fabric.Image.filters.Saturation({
                    saturation: Saturation,
                  })
                );
                break;
              case "Hue":
                item.filters.push(
                  new fabric.Image.filters.HueRotation({
                    rotation: Hue,
                  })
                );
                break;
              case "Noise":
                item.filters.push(
                  new fabric.Image.filters.Noise({
                    noise: Noise,
                  })
                );
                break;
              default:
                item.filters.push(
                  new fabric.Image.filters.Noise({
                    noise: 0,
                  })
                );

                break;
            }
          }
          item.applyFilters();
          canvas.renderAll();
        }
      });
    }
  }
  // 橡皮擦
  function initEraser() {
    selectTool = "eraser";

    canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
    canvas.freeDrawingBrush.width = lineSize;
    canvas.isDrawingMode = true;

    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = lineSize;
    canvas.isDrawingMode = true;
  }
  // 绘制图形
  function startDrawingObject(canvasObject: any) {
    // 禁止用户选择当前正在绘制的图形
    canvasObject.selectable = false;
    // 如果当前图形已绘制，清除上一次绘制的图形
    if (drawingObject) {
      canvas.remove(drawingObject);
    }
    // 将绘制对象添加到 canvas中
    canvas.add(canvasObject);
    // 保存当前绘制的图形
    drawingObject = canvasObject;
  }
  // 清空鼠标移动记录 （起点 与 终点）
  function resetMove() {
    mouseFrom = {};
    mouseTo = {};
  }
  // 绘图工具点击选择
  function tapToolBtn(tool: any) {
    initCanvasEvent();
    // 保存当前选中的绘图工具
    canvas.isDrawingMode = false;
    selectTool = tool;
    let drawObjects = canvas.getObjects();
    if (tool == "oneChoose") {
      if (drawObjects.length > 0) {
        drawObjects.map((item: any) => {
          item.set("selectable", true);
        });
        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type !== "group") {
          return;
        }
        canvas.getActiveObject().toActiveSelection();
        canvas.requestRenderAll();
      }
    } else {
      // 禁止图形选择编辑
      if (drawObjects.length > 0) {
        drawObjects.map((item: any) => {
          item.set("selectable", false);
        });
      }
    }
  }
  // 组合选择
  function moreChoose() {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== "activeSelection") {
      return;
    }
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
  }
  //笔刷选择
  function brushSure() {
    selectTool = "brush";

    function brush(freeDrawingBrush: any) {
      freeDrawingBrush.color = lineColor;
      freeDrawingBrush.width = lineSize;
      freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 10,
        offsetX: 10,
        offsetY: 10,
        affectStroke: true,
        color: shadowColor,
      });
    }
    switch (brushStyle) {
      case "PencilBrush":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        brush(canvas.freeDrawingBrush);
        break;
      case "CircleBrush":
        canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
        brush(canvas.freeDrawingBrush);
        break;
      case "SprayBrush":
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
        brush(canvas.freeDrawingBrush);
        break;
      default:
        break;
    }
    canvas.isDrawingMode = true;
  }
  return (
    <div className="all">
      <div className="left">
        <button
          type="button"
          className="rect"
          onClick={() => {
            tapToolBtn("rect");
          }}
        ></button>
        <button
          className="circle"
          type="button"
          onClick={() => {
            tapToolBtn("circle");
          }}
        ></button>
        <button
          type="button"
          className="polyLine"
          onClick={() => {
            tapToolBtn("polyline");
          }}
        ></button>
        <button
          className="text"
          type="button"
          onClick={() => {
            tapToolBtn("text");
          }}
        ></button>
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
            initImg();
          }}
        >
          添加图片
        </button>
        <button
          type="button"
          onClick={() => {
            tapToolBtn("oneChoose");
          }}
        >
          单个选中图形
        </button>
        <button
          type="button"
          onClick={() => {
            moreChoose();
          }}
        >
          组合选中图形
        </button>
        <button
          type="button"
          className="eraser"
          onClick={() => {
            initEraser();
          }}
        ></button>
        <span>笔刷选择：</span>
        <select
          defaultValue={brushStyle}
          onChange={(e) => {
            brushStyle = e.target.value;
          }}
        >
          <option value="PencilBrush">Pencil</option>
          <option value="CircleBrush">Circle </option>
          <option value="SprayBrush">Spray</option>
        </select>
        <span>大小： </span>
        <input
          type="range"
          defaultValue={lineSize}
          min="2"
          max="10"
          onChange={(e) => {
            lineSize = Number(e.target.value);
          }}
          step="0.1"
        />
        <div className="color">
          <div>颜色： </div>
          <input
            type="color"
            defaultValue={lineColor}
            onChange={(e) => {
              lineColor = e.target.value;
            }}
          />
          <div>阴影颜色： </div>
          <input
            type="color"
            defaultValue={shadowColor}
            onChange={(e) => {
              shadowColor = e.target.value;
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            brushSure();
          }}
        >
          确定
        </button>
        <button
          type="button"
          onClick={() => {
            canvas.clear();
          }}
        >
          清除画布
        </button>
        <Checkbox.Group onChange={filterChange} disabled={status}>
          <Row>
            <Checkbox value="Saturation">Saturation</Checkbox>
            <input
              type="range"
              disabled={status}
              defaultValue={Saturation}
              min="0"
              max="1"
              onChange={(e) => {
                setSaturation(Number(e.target.value));
              }}
              step="0.1"
            />
            <Checkbox value="Hue">Hue</Checkbox>
            <input
              type="range"
              disabled={status}
              defaultValue={Hue}
              min="0"
              max="360"
              onChange={(e) => {
                setHue(Number(e.target.value));
              }}
              step="0.1"
            />
            <Checkbox value="Noise">Noise</Checkbox>
            <input
              disabled={status}
              type="range"
              defaultValue={Noise}
              min="0"
              max="100"
              onChange={(e) => {
                setNoise(Number(e.target.value));
              }}
              step="0.1"
            />
          </Row>
        </Checkbox.Group>
      </div>
      <div className="right">
        <canvas
          className="canvas"
          width="800"
          height="800"
          ref={canvasWebgl}
        ></canvas>
      </div>
    </div>
  );
}
export default Fabric;
