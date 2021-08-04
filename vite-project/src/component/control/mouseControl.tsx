import React , { useContext,useEffect,useState,useCallback } from 'react';
import {position,drawRect,getImageLines,findCrossPoints,controlPosition,rgba,drawBorder,drawImg} from "../control/imgRender";
import{CursorStyleHandler,acrossScale, vertical} from "../control/controlStyle";
function MouseControl(name:string,changeScale:Function,changeLeft:Function,changeTop:Function,canvas:any,ctx:any,rotate:number,sw:number,sh:number,x:number,y:number,isTransparent:boolean,
  sliderx?:number, slidery?:number,w?:number,h?:number,scaleSlider?:number,img?:HTMLImageElement){
  var clickFlag=false;
  var isControl:string='move';
  var scale:any;
  const OriginXy:number=sh/sw;
  let OriginSh:number;
  if(h&&scaleSlider){OriginSh=h*scaleSlider}
  const MaxSw:number=300;
  const MinSw:number=20;
  const MaxSh:number=MaxSw*OriginXy;
  const MinSh:number=MinSw*OriginXy;
  canvas.onmousedown=function(e:any){
    console.log(e.offsetX,e.offsetY)
    let coords=position(sw+20,sh+20,x-10,y-10,rotate);
    let lines=getImageLines(coords);
    let points={x:e.offsetX,y:e.offsetY};
    let xPoints=findCrossPoints(points,lines)
    if( (xPoints !== 0 && xPoints % 2 === 1)||isControl){
      var Transparent=rgba(e.offsetX,e.offsetY,ctx);
      console.log(Transparent)
        if(Transparent||isTransparent){
          isControl='move';
          clickFlag=true;
          drawBorder(ctx,rotate,x,y,sw,sh);
        }
        else{
          clickFlag=false;
          isControl='move';
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ChooseCase(name)
        }
      }
    else{
      clickFlag=false;
      isControl='move';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
     ChooseCase(name)
    }
  }
  canvas.onmousemove=function(e:any){
    let tr:any,tl:any,bl:any,br:any,xPointsTl:any,xPointsTm:any,xPointsTr:any,xPointsRm:any,xPointsBr:any,xPointsBm:any,xPointsBl:any,xPointsLm:any,xPointsT:any
      //控制器区域
  function controlArea(e:any,x:number,y:number,sw:number,sh:number){
    // 上左
     tl=position(sw+20,sh+20,x-10,y-10,rotate).tl;
    let coordsTl=position(10,10,tl.x-5,tl.y-5,rotate);
    let points={x:e.offsetX,y:e.offsetY};
     xPointsTl=controlPosition(coordsTl,points)
    // 上右
     tr=position(sw+20,sh+20,x-10,y-10,rotate).tr;
    let coordsTr=position(10,10,tr.x-5,tr.y-5,rotate);
     xPointsTr=controlPosition(coordsTr,points)
    // 上中
    let tm={x:(tr.x-tl.x)/2+tl.x-5,y:(tr.y-tl.y)/2+tl.y-5}
    let coordsTm=position(10,10,(tr.x-tl.x)/2+tl.x-5,(tr.y-tl.y)/2+tl.y-5,rotate);
     xPointsTm=controlPosition(coordsTm,points)
     // 下左
    bl=position(sw+20,sh+20,x-10,y-10,rotate).bl;
    let coordsBl=position(10,10,bl.x-5,bl.y-5,rotate);
    xPointsBl=controlPosition(coordsBl,points)
    // 下右
    br=position(sw+20,sh+20,x-10,y-10,rotate).br;
    let coordsBr=position(10,10,br.x-5,br.y-5,rotate);
     xPointsBr=controlPosition(coordsBr,points)
    // 下中
    let bm={x:(br.x-bl.x)/2+bl.x-5,y:(br.y-bl.y)/2+bl.y-5}
    let coordsBm=position(10,10,(br.x-bl.x)/2+bl.x-5,(br.y-bl.y)/2+bl.y-5,rotate);
     xPointsBm=controlPosition(coordsBm,points)
    // 最上
    var a=(tr.x-tl.x)/2+tl.x-5
    var b=(tr.y-tl.y)/2+tl.y-5
    let coordsT=position(10,10,a+35*Math.sin(rotate*Math.PI/180),b-35*Math.cos(rotate*Math.PI/180),rotate);
     xPointsT=controlPosition(coordsT,points)
    // 左中
    let lm={x:(tl.x-bl.x)/2+bl.x-5,y:(tl.y-bl.y)/2+bl.y-5}
    let coordsLm=position(10,10,(tl.x-bl.x)/2+bl.x-5,(tl.y-bl.y)/2+bl.y-5,rotate);
    xPointsLm=controlPosition(coordsLm,points)
    // 右中
    let rm={x:(tr.x-br.x)/2+br.x-5,y:(tr.y-br.y)/2+br.y-5}
    let coordsRm=position(10,10,(tr.x-br.x)/2+br.x-5,(tr.y-br.y)/2+br.y-5,rotate);
     xPointsRm=controlPosition(coordsRm,points)
 }         
    console.log(isControl,canvas.style.cursor);  
    if(e.which===1&&clickFlag&&isControl==='move'){
      console.log(x,y)
      x=x+e.movementX;
      y=y+e.movementY;
      changeLeft(x);
      changeTop(y);
      ctx.clearRect(0, 0, canvas.width, canvas.height);         
      ChooseCase(name)
      drawBorder(ctx,rotate,x,y,sw,sh);
      }
      controlArea(e,x,y,sw,sh);
    if(clickFlag&&xPointsTl !== 0 && xPointsTl % 2 === 1){
      console.log('上左')
      // canvas.style.cursor='nw-resize';
      let tl1={x:-sw/2,y:sh/2}
      canvas.style.cursor=CursorStyleHandler(rotate,tl1);
      isControl='tl';     
    }
    else if(clickFlag&&xPointsTm !== 0 && xPointsTm % 2 === 1){
      console.log('上中')
      // canvas.style.cursor='n-resize';
      let tm1={x:0,y:sh/2}
      canvas.style.cursor=CursorStyleHandler(rotate,tm1);
      }
    else if (clickFlag&&xPointsTr !== 0 && xPointsTr % 2 === 1){
      console.log('上右')
      isControl='tr';
      // canvas.style.cursor='ne-resize';
      let tr1={x:sw/2,y:sh/2}
      canvas.style.cursor=CursorStyleHandler(rotate,tr1);
    }
    else if(clickFlag&&xPointsRm !== 0 && xPointsRm % 2 === 1){
      console.log('右中')
      // canvas.style.cursor='e-resize';
      let rm1={x:sw/2,y:0}
      canvas.style.cursor=CursorStyleHandler(rotate,rm1);
      }
      else if(clickFlag&&xPointsBr !== 0 && xPointsBr % 2 === 1){
        console.log('下右')
        isControl='br';   
        let br1={x:sw/2,y:-sh/2}
        canvas.style.cursor=CursorStyleHandler(rotate,br1);
        // canvas.style.cursor='se-resize';
      }
      else if(clickFlag&&xPointsBm !== 0 && xPointsBm % 2 === 1){
        console.log('下中')
        let bm1={x:0,y:-sh/2}
        canvas.style.cursor=CursorStyleHandler(rotate,bm1);
        // canvas.style.cursor='s-resize';
        }
    else if(clickFlag&&xPointsBl !== 0 && xPointsBl % 2 === 1){
      console.log('下左')
      isControl='bl';   
      let bl1={x:-sw/2,y:-sh/2};
      console.log(bl1,sw,sh,rotate)
      canvas.style.cursor=CursorStyleHandler(rotate,bl1);
      // canvas.style.cursor='sw-resize';
    }
    else if(clickFlag&&xPointsLm !== 0 && xPointsLm % 2 === 1){
      console.log('左中')
      let lm1={x:-sw/2,y:0}
      canvas.style.cursor=CursorStyleHandler(rotate,lm1);
      // canvas.style.cursor='w-resize';
      }    
    else if(clickFlag&&xPointsT !== 0 && xPointsT % 2 === 1){
      console.log('最上')
      canvas.style.cursor='crosshair';
      }
      else {
        canvas.style.cursor='default';
    } 
    var across,offset,origin;
    across={tl,tr,bl,br};
    offset={x:e.offsetX,y:e.offsetY}
    origin={x:x+sw/2,y:y+sh/2}
    if(e.which===1&&isControl!='move'){  
      let vert;
      switch (isControl) {
        case 'tl':
          vert=vertical(offset,origin,across.tl);
          break;
        case 'tr':
          vert=vertical(offset,origin,across.tr);
          break;
        case 'br':
          vert=vertical(offset,origin,across.br);
          break;
        case 'bl':
          vert=vertical(offset,origin,across.bl);
          break;
        default:
          break;
      }
      scale=acrossScale(isControl,rotate,across,offset)
      // scale=((y-vert.y)*2+sh)/sh;
      console.log(vert);
      // x=vert.x;
      // y=vert.y;
      
      if(sh<=MaxSh&&sw<=MaxSw&&sh>=MinSh&&sw>=MinSw){
      sh=sh*scale;
      sw=sw*scale; 
       
      }
      else if(sh>MaxSh&&sw>MaxSw&&scale<1){
      sh=sh*scale;
      sw=sw*scale; 
      }
      else if(sh<MinSh&&sw<MinSw&&scale>1){
      sh=sh*scale;
      sw=sw*scale; 
      }
      x=x+sw*(1-scale)/2; 
      y=y+sh*(1-scale)/2; 
      console.log(tl);  
      ChooseCase(name)
      let ScaleChange=sh/OriginSh;
      changeScale(ScaleChange);
      drawBorder(ctx,rotate,x,y,sw,sh);
      controlArea(e,x,y,sw,sh);
    } 
   
  }
  function ChooseCase(name:string) {
    switch (name) {
      case 'img':
        if(img&&sliderx&&slidery&&w&&h){
        drawImg(canvas,img,ctx,rotate,x,y,sw,sh,sliderx,slidery,w,h)
        }
        break;
        case 'rect':
        drawRect(canvas,ctx,rotate,x,y,sw,sh)
          break;
      default:
        break;
    }
  }
 
};

  
export  {MouseControl};


