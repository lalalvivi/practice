import React , { useContext,useEffect,useState,useCallback } from 'react';
var newScaleMap = ['nw', 'ne','n', 'se', 'w', 'sw', 's', 'nw', ];
var scaleMap = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se', ];
// 鼠标变换
function CursorStyleHandler(rotate:number,control:{x:number,y:number}) {
  var n = findCornerQuadrant(rotate,control);
  return scaleMap[n%8] + '-resize';
}
// 控制器角度旋转
function findCornerQuadrant( rotate:number,control:{x:number,y:number}) {
  var cornerAngle = -rotate+ Math.atan2(control.y, control.x)/Math.PI*180 + 720;
  return Math.round((cornerAngle % 360) / 45)
}
// 对角拖动放大缩小(绕着顶点)
function acrossScale(isControl:string,rotate:number,across:any,offset:any){
  let scale;
  let fourControl:string[]=['tl','tr','br','bl'];
  let a:number=Math.round(rotate/90);
  let b:any;
  fourControl.filter((item,index)=>{
    if(item===isControl){
      b=index;
    }
  })
  let isControlRotate=fourControl[(a+b)%4];
  console.log(isControl);
  
  switch (isControl) {
    case 'tl':
      controlChange(across.tl,isControlRotate);
      break;
    case 'tr':
      controlChange(across.tr,isControlRotate);
      break;
    case 'br':
      controlChange(across.br,isControlRotate);
      break;
    case 'bl':
      controlChange(across.bl,isControlRotate);
      break;
    default:
      break;
  }
  return scale;
  function controlChange(control:any,isControlRotate:string){
    switch (isControlRotate) {
      case 'tl':
         scale=control.x/(offset.x)*(control.y/(offset.y));
        break;
      case 'tr':
         scale=offset.x/control.x*(control.y/(offset.y));
        break;
      case 'br':
         scale=offset.x/control.x*(offset.y/control.y);
        break;
      case 'bl':
         scale=control.x/(offset.x)*(offset.y/control.y);
        break;
      default:
        break;
    }
  }
}
// 对角拖动放大缩小(绕着中心点)
function centerScale(isControl:string,rotate:number,across:any,offset:any){

}
// 垂直交点
function vertical(point:any,pnt1:any,pnt2:any){
  let A=pnt2.y-pnt1.y;
  let B=pnt1.x-pnt2.x;
  let C=pnt2.x*pnt1.y-pnt1.x*pnt2.y;
  let x,y;
  let fPoint={x:1,y:1};
  if (A * A + B * B < 1e-13) {
    return pnt1;   //pnt1与pnt2重叠
}
else if (Math.abs(A * point.x + B * point.y + C) < 1e-13) {
    return point;   //point在直线上(pnt1_pnt2)
}
else {
    x = (B * B * point.x - A * B * point.y - A * C) / (A * A + B * B);
    y = (-A * B * point.x + A * A * point.y - B * C) / (A * A + B * B);
    fPoint.x = x;
    fPoint.y = y;
    return fPoint;
}
}
export {CursorStyleHandler,acrossScale,vertical};