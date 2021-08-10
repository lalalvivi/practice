import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useReducer,
} from "react";
import Router from "./router";
import "./App.less";
import Rect from "./component/case/rect";
import Color from "./component/attribute/color";
import Dotted from "./component/attribute/dotted";
import LineStyle from "./component/attribute/lineStyle";
import Blur from "./component/attribute/blur";
import TextStyle from "./component/attribute/textStyle";
import Scale from "./component/attribute/scale";
import Rotate from "./component/attribute/rotate";
import Alpha from "./component/attribute/alpha";
import Source from "./component/attribute/source";
import Origin from "./component/attribute/origin";
import ImgStyle from "./component/attribute/imgStyle";
import Tangle from "./component/case/tangle";
import Line from "./component/case/line";
import Arc from "./component/case/arc";
import Quadratic from "./component/case/quadratic";
import Bezier from "./component/case/bezier";
import PathLine from "./component/case/pathLine";
import TextContent from "./component/case/text";
import ImgContent from "./component/case/img";
import ClearAll from "./component/case/clearAll";
import DrawShape from "./component/webgl/drawShape";
import ChooseColor from "./component/attribute/chooseColor";
import MouseDraw from "./component/webgl/mouseDraw";
import AnimationDraw from "./component/webgl/animation";
import {
  imgReducer,
  imgState,
  initState,
  reducer,
  textReducer,
  textState,
} from "./component/initState";
export const appContext = createContext({});
function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [txState, textDispatch] = useReducer(textReducer, textState);
  const [imageState, imgDispatch] = useReducer(imgReducer, imgState);
  const [drawN, setDrawN] = useState<number>(3);
  const [turn, setTurn] = useState<string>("black");
  const [active, setActive] = useState<boolean>(false);
  const selectedColor = React.useRef<HTMLDivElement>(null);
  const canvasAll = React.useRef<HTMLCanvasElement>(null);
  const canvasWebgl = React.useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<any>();
  const changeDrawN = useCallback((code: number) => {
    setDrawN(code);
  }, []);
  const changeTurn = useCallback((code: string) => {
    setTurn(code);
  }, []);
  const changeActive = useCallback((code: boolean) => {
    setActive(code);
  }, []);
  useEffect(() => {
    if (!ctx) {
      console.log(42342);
      setCtx(init());
    }
    //处理异步数据
  }, [ctx, canvasAll, turn, active, state, txState, imgState]);
  function init() {
    let canvas = canvasAll.current;
    let ctx = canvas?.getContext("2d");
    return ctx;
  }
  return (
    <div className="all">
      {/* <Router /> */}
      <div className="left">
        <Rect
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <Tangle
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <Line
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <Arc
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <Quadratic
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <Bezier
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <PathLine
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          turn={turn}
          changeTurn={changeTurn}
        />
        <TextContent
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          txState={txState}
          textDispatch={textDispatch}
          turn={turn}
          changeTurn={changeTurn}
        />
        <ImgContent
          ctx={ctx}
          canvasAll={canvasAll}
          state={state}
          imageState={imageState}
          imgDispatch={imgDispatch}
          turn={turn}
          changeTurn={changeTurn}
        />
        <ImgStyle imgDispatch={imgDispatch} imageState={imageState} />
        <Origin dispatch={dispatch} state={state} />
      </div>
      <div className="right">
        <ClearAll
          dispatch={dispatch}
          textDispatch={textDispatch}
          imgDispatch={imgDispatch}
          ctx={ctx}
          canvasAll={canvasAll}
          changeTurn={changeTurn}
        />
        <div className="rightContent">
          <Source dispatch={dispatch} state={state} />
          <Scale dispatch={dispatch} state={state} />
          <Rotate dispatch={dispatch} state={state} />
          <Alpha dispatch={dispatch} state={state} />
          <Color dispatch={dispatch} state={state} />
          <div ref={selectedColor} className="selectedColor"></div>
          <Dotted dispatch={dispatch} state={state} />
          <LineStyle dispatch={dispatch} state={state} />
          <Blur dispatch={dispatch} state={state} />
          <TextStyle textDispatch={textDispatch} txState={txState} />
          <ChooseColor
            canvasAll={canvasAll}
            selectedColor={selectedColor}
            active={active}
            ctx={ctx}
            dispatch={dispatch}
            changeActive={changeActive}
          ></ChooseColor>
          <MouseDraw canvasWebgl={canvasWebgl}></MouseDraw>
          <AnimationDraw canvasWebgl={canvasWebgl}></AnimationDraw>
          <DrawShape
            drawN={drawN}
            changeDrawN={changeDrawN}
            canvasWebgl={canvasWebgl}
          />
        </div>
        <div className="canvasAll">
          <canvas
            className="canvas"
            ref={canvasAll}
            id="canvas"
            width="800"
            height="800"
          ></canvas>
        </div>
        <canvas
          ref={canvasWebgl}
          id="canvas1"
          width="1720"
          height="800"
        ></canvas>
      </div>
    </div>
  );
}
export default App;
