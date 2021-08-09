//四个坐标点定位区域
const position = (
  sw: number,
  sh: number,
  x: number,
  y: number,
  rotate: number
) => {
  var a1 = (Math.atan(sh / 2 / (sw / 2)) * 180) / Math.PI;
  var h1 = (0.5 * sh) / Math.sin((a1 * Math.PI) / 180);
  // 左上角
  var y2 = sh / 2 - h1 * Math.cos(((90 - a1 - rotate) * Math.PI) / 180);
  var x2 = y2 / Math.tan(((90 - a1 - 0.5 * rotate) * Math.PI) / 180);
  var xLt = x - x2;
  var yLt = y + y2;
  // console.log(x2,x-x2,y+y2)
  // 右上角
  var y3 = sh / 2 - h1 * Math.sin(((a1 - rotate) * Math.PI) / 180);
  var x3 = h1 * Math.cos(((a1 - rotate) * Math.PI) / 180) - sw / 2;
  var xRt = x + x3 + sw;
  var yRt = y + y3;
  // console.log(x+x3+sw,a1,Math.sin((a1-rotate)*Math.PI/180),y3,y+y3,rotate)
  // 右下角
  var y4 = h1 * Math.cos(((90 - a1 - rotate) * Math.PI) / 180) - sh / 2;
  var x4 = y4 * Math.tan(((a1 + 0.5 * rotate) * Math.PI) / 180);
  var xRb = x + sw - x4;
  var yRb = y + y4 + sh;
  //  console.log(x+sw-x4,y+y4+sh,rotate)
  // 左下角
  var x5 = h1 * Math.cos(((a1 - rotate) * Math.PI) / 180) - sw / 2;
  var y5 = x5 * Math.tan(((90 - a1 + 0.5 * rotate) * Math.PI) / 180);
  var xLb = x - x5;
  var yLb = y + sh - y5;
  //  console.log(x-x5,y+sh-y5,rotate)
  let coords = { tl: {}, tr: {}, br: {}, bl: {} };
  coords.tl = { x: xLt, y: yLt };
  coords.tr = { x: xRt, y: yRt };
  coords.br = { x: xRb, y: yRb };
  coords.bl = { x: xLb, y: yLb };
  return coords;
};
// 四条直线区域
function getImageLines(oCoords: any) {
  var lines = {
    topline: {
      o: oCoords.tl,
      d: oCoords.tr,
    },
    rightline: {
      o: oCoords.tr,
      d: oCoords.br,
    },
    bottomline: {
      o: oCoords.br,
      d: oCoords.bl,
    },
    leftline: {
      o: oCoords.bl,
      d: oCoords.tl,
    },
  };
  return lines;
}
// 点是否在区域内
function findCrossPoints(point: any, lines: any) {
  var b1,
    b2,
    a1,
    a2,
    xi, // yi,
    xcount = 0,
    iLine;

  for (var lineKey in lines) {
    iLine = lines[lineKey];
    // optimisation 1: line below point. no cross
    if (iLine.o.y < point.y && iLine.d.y < point.y) {
      continue;
    }
    // optimisation 2: line above point. no cross
    if (iLine.o.y >= point.y && iLine.d.y >= point.y) {
      continue;
    }
    // optimisation 3: vertical line case
    if (iLine.o.x === iLine.d.x && iLine.o.x >= point.x) {
      xi = iLine.o.x;
      // yi = point.y;
    }
    // calculate the intersection point
    else {
      b1 = 0;
      b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
      a1 = point.y - b1 * point.x;
      a2 = iLine.o.y - b2 * iLine.o.x;

      xi = -(a1 - a2) / (b1 - b2);
      // yi = a1 + b1 * xi;
    }
    // dont count xi < point.x cases
    if (xi >= point.x) {
      xcount += 1;
    }
    // optimisation 4: specific for square images
    if (xcount === 2) {
      break;
    }
  }
  return xcount;
}
//control控制器定位区域
function controlPosition(coords: any, points: any) {
  let lines = getImageLines(coords);
  let point = points;
  let xPoints = findCrossPoints(point, lines);
  return xPoints;
}
// rgba判断
function rgba(x: number, y: number, ctx: any) {
  var _isTransparent = true;
  var myImageData = ctx.getImageData(x, y, 1, 1);
  var l = myImageData.data.length;
  for (let i = 3; i < l; i += 4) {
    let temp = myImageData.data[i];
    _isTransparent = temp > 0;
    if (_isTransparent === false) {
      break;
    }
  }
  return _isTransparent;
}
//  选中后边框
function drawBorder(
  ctx: any,
  rotate: number,
  x: number,
  y: number,
  sw: number,
  sh: number
) {
  ctx.save();
  ctx.translate(x + sw / 2, y + sh / 2);
  ctx.strokeStyle = "red";
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.translate(-x - sw / 2, -y - sh / 2);
  ctx.strokeRect(x - 10, y - 10, sw + 20, sh + 20);
  ctx.beginPath();
  ctx.lineTo(sw / 2 + x, y - 15);
  ctx.lineTo(sw / 2 + x, y - 40);
  ctx.stroke();
  // 上左
  control(x - 15, y - 15, 10, 10, ctx);
  // 上中
  control(sw / 2 + x - 5, y - 15, 10, 10, ctx);
  // 上右
  control(sw + x + 5, y - 15, 10, 10, ctx);
  // 最上
  control(sw / 2 + x - 5, y - 50, 10, 10, ctx);
  // 左中
  control(x - 15, y - 5 + sh / 2, 10, 10, ctx);
  // 右中
  control(sw + x + 5, y - 5 + sh / 2, 10, 10, ctx);
  // 下中
  control(sw / 2 + x - 5, y + 5 + sh, 10, 10, ctx);
  // 下左
  control(x - 15, y + sh + 5, 10, 10, ctx);
  // 下右
  control(sw + x + 5, y + sh + 5, 10, 10, ctx);
  ctx.restore();
}
// 控制器绘制
function control(ax: number, ay: number, w: number, h: number, ctx: any) {
  ctx.fillRect(ax, ay, w, h);
}
// 图片绘制
function drawImg(
  canvas: any,
  img: HTMLImageElement,
  ctx: any,
  rotate: number,
  x: number,
  y: number,
  sw: number,
  sh: number,
  sliderx: number,
  slidery: number,
  w: number,
  h: number
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(x + sw / 2, y + sh / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.translate(-x - sw / 2, -y - sh / 2);
  ctx.drawImage(img, sliderx, slidery, w, h, x, y, sw, sh);
  ctx.restore();
}
// 矩形绘制
function drawRect(
  canvas: any,
  ctx: any,
  rotate: number,
  x: number,
  y: number,
  sw: number,
  sh: number
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(x + sw / 2, y + sh / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.translate(-x - sw / 2, -y - sh / 2);
  ctx.strokeRect(x, y, sw, sh);
  ctx.restore();
}
export {
  position,
  getImageLines,
  findCrossPoints,
  controlPosition,
  rgba,
  drawBorder,
  drawImg,
  drawRect,
};
