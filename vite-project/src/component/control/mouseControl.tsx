import React , { useContext,useEffect,useState,useCallback } from 'react';
import {position,drawRect,getImageLines,findCrossPoints,controlPosition,rgba,drawBorder,drawImg} from "../control/imgRender";
function MouseControl(name:string,changeLeft:Function,changeTop:Function,canvas:any,ctx:any,rotate:number,sw:number,sh:number,x:number,y:number,isTransparent:boolean,
  sliderx?:number, slidery?:number,w?:number,h?:number,img?:HTMLImageElement){
  var clickFlag=false;
  canvas.onmousedown=function(e:any){
    console.log(e.offsetX,e.offsetY)
    let coords=position(sw+20,sh+20,x-10,y-10,rotate);
    let lines=getImageLines(coords);
    let points={x:e.offsetX,y:e.offsetY};
    let xPoints=findCrossPoints(points,lines)
    if( xPoints !== 0 && xPoints % 2 === 1){
      var Transparent=rgba(e.offsetX,e.offsetY,ctx);
      console.log(Transparent)
        if(Transparent||isTransparent){
          clickFlag=true;
          drawBorder(ctx,rotate,x,y,sw,sh);
        }
        else{
          clickFlag=false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ChooseCase(name)
        }
      }
    else{
      clickFlag=false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
     ChooseCase(name)
    }
  }
  canvas.onmousemove=function(e:any){
    if(e.which===1&&clickFlag){
      console.log(x,y)
      x=x+e.movementX;
      y=y+e.movementY;
      changeLeft(x);
      changeTop(y);
      ctx.clearRect(0, 0, canvas.width, canvas.height);         
      ChooseCase(name)
      drawBorder(ctx,rotate,x,y,sw,sh);
      }
       // 上左
    let tl:any=position(sw+20,sh+20,x-10,y-10,rotate).tl;
    let coordsTl=position(10,10,tl.x-5,tl.y-5,rotate);
    let points={x:e.offsetX,y:e.offsetY};
    let xPointsTl=controlPosition(coordsTl,points)
    // 上右
    let tr:any=position(sw+20,sh+20,x-10,y-10,rotate).tr;
    let coordsTr=position(10,10,tr.x-5,tr.y-5,rotate);
    let xPointsTr=controlPosition(coordsTr,points)
    // 上中
    let coordsTm=position(10,10,(tr.x-tl.x)/2+tl.x-5,(tr.y-tl.y)/2+tl.y-5,rotate);
    let xPointsTm=controlPosition(coordsTm,points)
     // 下左
    let bl:any=position(sw+20,sh+20,x-10,y-10,rotate).bl;
    let coordsBl=position(10,10,bl.x-5,bl.y-5,rotate);
    let xPointsBl=controlPosition(coordsBl,points)
    // 下右
    let br:any=position(sw+20,sh+20,x-10,y-10,rotate).br;
    let coordsBr=position(10,10,br.x-5,br.y-5,rotate);
    let xPointsBr=controlPosition(coordsBr,points)
    // 下中
    let coordsBm=position(10,10,(br.x-bl.x)/2+bl.x-5,(br.y-bl.y)/2+bl.y-5,rotate);
    let xPointsBm=controlPosition(coordsBm,points)
    // 最上
    var a=(tr.x-tl.x)/2+tl.x-5
    var b=(tr.y-tl.y)/2+tl.y-5
    let coordsT=position(10,10,a+35*Math.sin(rotate*Math.PI/180),b-35*Math.cos(rotate*Math.PI/180),rotate);
    let xPointsT=controlPosition(coordsT,points)
    // 左中
    let coordsLm=position(10,10,(tl.x-bl.x)/2+bl.x-5,(tl.y-bl.y)/2+bl.y-5,rotate);
    let xPointsLm=controlPosition(coordsLm,points)
    // 右中
    let coordsRm=position(10,10,(tr.x-br.x)/2+br.x-5,(tr.y-br.y)/2+br.y-5,rotate);
    let xPointsRm=controlPosition(coordsRm,points)
    if(clickFlag&&xPointsTl !== 0 && xPointsTl % 2 === 1){
      console.log('上左')
      canvas.style.cursor='nw-resize';
    }
    else if (clickFlag&&xPointsTr !== 0 && xPointsTr % 2 === 1){
      console.log('上右')
      canvas.style.cursor='ne-resize';
    }
    else if(clickFlag&&xPointsTm !== 0 && xPointsTm % 2 === 1){
      console.log('上中')
      canvas.style.cursor='n-resize';
      }
    else if(clickFlag&&xPointsBl !== 0 && xPointsBl % 2 === 1){
      console.log('下左')
      canvas.style.cursor='sw-resize';
    }
       
    else if(clickFlag&&xPointsBr !== 0 && xPointsBr % 2 === 1){
      console.log('下右')
      canvas.style.cursor='se-resize';
    }
    
    else if(clickFlag&&xPointsBm !== 0 && xPointsBm % 2 === 1){
      console.log('下中')
      canvas.style.cursor='s-resize';
      }
      
    else if(clickFlag&&xPointsT !== 0 && xPointsT % 2 === 1){
      console.log('最上')
      canvas.style.cursor='crosshair';
      }
    
    else if(clickFlag&&xPointsLm !== 0 && xPointsLm % 2 === 1){
      console.log('左中')
      canvas.style.cursor='w-resize';
      }
    
    else if(clickFlag&&xPointsRm !== 0 && xPointsRm % 2 === 1){
      console.log('右中')
      canvas.style.cursor='e-resize';
      }
      else{canvas.style.cursor='default';}           
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