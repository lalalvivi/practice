import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useReducer,
} from "react";
import "./canvas.less";
import Color from "../attribute/color";
import Dotted from "../attribute/dotted";
import LineStyle from "../attribute/lineStyle";
import Blur from "../attribute/blur";
import TextStyle from "../attribute/textStyle";
import Scale from "../attribute/scale";
import Rotate from "../attribute/rotate";
import Alpha from "../attribute/alpha";
import Source from "../attribute/source";
import Origin from "../attribute/origin";
import ImgStyle from "../attribute/imgStyle";
import Tangle from "../case/tangle";
import Line from "../case/line";
import Arc from "../case/arc";
import Quadratic from "../case/quadratic";
import Bezier from "../case/bezier";
import PathLine from "../case/pathLine";
import TextContent from "../case/text";
import ImgContent from "../case/img";
import ClearAll from "../case/clearAll";
import ChooseColor from "../attribute/chooseColor";
import {
  imgReducer,
  imgState,
  initState,
  reducer,
  textReducer,
  textState,
} from "../initState";
import Rect from "../case/rect";
export const appContext = createContext({});
function Canvas() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [txState, textDispatch] = useReducer(textReducer, textState);
  const [imageState, imgDispatch] = useReducer(imgReducer, imgState);
  const [turn, setTurn] = useState<string>("black");
  const [active, setActive] = useState<boolean>(false);
  const selectedColor = React.useRef<HTMLDivElement>(null);
  const canvasAll = React.useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<any>();
  const changeTurn = useCallback((code: string) => {
    setTurn(code);
  }, []);
  const changeActive = useCallback((code: boolean) => {
    setActive(code);
  }, []);
  useEffect(() => {
    if (!ctx) {
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
      </div>
    </div>
  );
}
export default Canvas;
