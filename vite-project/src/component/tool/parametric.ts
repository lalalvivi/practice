import { newVector } from "./newVector";

function draw(points:any, context:any, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false,
} = {}) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...points[0]);
  for(let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if(close) context.closePath();
  if(fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.stroke();
}


export function parametric(sFunc:Function, tFunc:Function, rFunc?:Function) {
  return function (start:number, end:number, seg = 100, ...args:any[]) {
    const points = [];
    for(let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      const x = sFunc(t, ...args);
      const y = tFunc(t, ...args);
      if(rFunc) {
        points.push(rFunc(x, y));
      } else {
        points.push([x, y]);
      }
    }
    return {
      draw: draw.bind(null, points),
      points,
    };
  };
}
export function parametricWebgl(sFunc:Function, tFunc:Function, rFunc?:Function) {
  return function (start:number, end:number, seg = 100, ...args:any[]) {
    const points = [];
    for(let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      const x = sFunc(t, ...args);
      const y = tFunc(t, ...args);
      if(rFunc) {
        points.push(rFunc(x, y));
      } else {
        points.push([x, y]);
      }
    }
    return {
      // drawWebgl: drawWebgl.bind(null, points),
      points}
  };
}
export function drawWebgl(type:string) {
  let para:any,allPoints:any,p0:newVector,p1:newVector,p2:newVector,p3:newVector;
 switch (type) {
   case '椭圆':
     para = parametric(
      (t: number, a: number, b: number) => a * Math.cos(t),
      (t: number, a: number, b: number) => b * Math.sin(t)
    );
    allPoints = para(0, Math.PI * 2, 40, 50, 30, 50).points.flat();
     break;
   case '抛物线':
     para = parametric(
      (t: number) => 25 * t,
      (t: number) => 25 * t ** 2
    );
    allPoints = para(-1.5, 1.5).points.flat();
     break;
   case '阿基米德螺旋线':
     para = parametric(
      (t: number,l:number) => l * t*Math.cos(t),
      (t: number,l:number) => l * t*Math.sin(t),
    );
    allPoints = para(0,50,500,2).points.flat();
     break;
   case '星形线':
     para = parametric(
      (t: number,l:number) => l*Math.cos(t)**3,
      (t: number,l:number) => l*Math.sin(t)**3,
    );
    allPoints = para(0,Math.PI*2,50,50).points.flat();
     break;
   case '二阶贝塞尔':
     para = parametric(
      (t: number,[{x:x0},{x:x1},{x:x2}]:any[]) => (1-t)**2*x0+2*t*(1-t)*x1+t**2*x2,
      (t: number,[{y:y0},{y:y1},{y:y2}]:any[]) => (1-t)**2*y0+2*t*(1-t)*y1+t**2*y2,
    );
     p0=new newVector(0,0);
     p1=new newVector(100,0).rotate(0.5*Math.PI);
     p2=new newVector(200,45);
    allPoints = para(0,1,100,[p0,p1,p2]).points.flat();
     break;
   case '三阶贝塞尔':
     para = parametric(
      (t: number,[{x:x0},{x:x1},{x:x2},{x:x3}]:any[]) => (1-t)**3*x0+3*t*(1-t)**2*x1+3*(1-t)**2*x2+t**3*x3,
      (t: number,[{y:y0},{y:y1},{y:y2},{y:y3}]:any[]) => (1-t)**3*y0+3*t*(1-t)**2*y1+3*(1-t)**2*y2+t**3*y3,
    );
     p0=new newVector(0,0);
     p1=new newVector(10,0).rotate(0.5*Math.PI);
    p2=new newVector(15,0);
    p3=new newVector(20,0);
    allPoints = para(0,1,100,[p0,p1,p2,p3]).points.flat();
     break;
   default:
     break;
 }
 return allPoints;
}