import { Vec2 } from "./Vec2";
// linejoin:miter,linecap:butt
export function extrudePolyline(points:any, {thickness = 10,lineCap = 'butt'} = {}) {
    const halfThick = 0.5 * thickness;
    const innerSide = [];
    const outerSide = [];

    // 构建挤压顶点
    for(let i = 1; i < points.length - 1; i++) {
      const v1 = (new Vec2()).sub(points[i], points[i - 1]).normalize();
      const v2 = (new Vec2()).sub(points[i], points[i + 1]).normalize();
      const v = (new Vec2()).add(v1, v2).normalize(); // 得到挤压方向
      const norm = new Vec2(-v1.y, v1.x); // 法线方向
      const cos = norm.dot(v);
      const len = halfThick / cos;
      if(i === 1) { // 起始点
        const v0 = new Vec2(...norm).scale(halfThick);
        // let 
        switch (lineCap) {
          case 'butt':
            // let v32=(new Vec2()).add(points[0], v0)
            // let v42=(new Vec2()).sub(points[0], v0);
            // let v33=new Vec2().add(v32,new Vec2()).normalize().scale(v32.len()+halfThick)
            // let v43=new Vec2().add(v42,new Vec2()).normalize().scale(v42.len()+halfThick)
            // let dir=v32.dir()-v42.dir()
            // console.log(dir);
            // // v43.rotate(dir)
            // //   v33.rotate(0)
            //   console.log(v32,v42,v33,v43);
              
            //   outerSide.push(v33);
            //   innerSide.push(v43);
            // for (let i = 1; i < dir; i++) {
            //   // let v33=new Vec2().add(v32,new Vec2()).normalize().scale(v32.len()+halfThick)
            //  v43.rotate(i*Math.PI/dir)
            //   v33.rotate(0)
            //   console.log(v32,v42,v33,v43);
              
            //   outerSide.push(v33);
            //   innerSide.push(v43);
            // }     
            outerSide.push((new Vec2()).add(points[0], v0));
            innerSide.push((new Vec2()).sub(points[0], v0));

            break;
          case 'square':
            let v31=(new Vec2()).add(points[0], v0)
            let va=new Vec2().add(v1, v2).normalize().scale(len);
            let v3=new Vec2().add(points[i],va );
            let v4=(new Vec2()).sub(points[i], va);
            let v41=(new Vec2()).sub(points[0], v0);
            outerSide.push(new Vec2().add(new Vec2().sub(v31,v3).normalize().scale(halfThick),v31));
            innerSide.push(new Vec2().add(new Vec2().sub(v41,v4).normalize().scale(halfThick),v41));
            break;  
          default:
            break;
        }
      }
      v.scale(len);
      outerSide.push((new Vec2()).add(points[i], v));
      innerSide.push((new Vec2()).sub(points[i], v));
      if(i === points.length - 2) { // 结束点
        const norm2 = new Vec2(v2.y, -v2.x);
        const v0 = new Vec2(...norm2).scale(halfThick);
        switch (lineCap) {
          case 'butt':
            outerSide.push((new Vec2()).add(points[points.length - 1], v0));
            innerSide.push((new Vec2()).sub(points[points.length - 1], v0));
            break;
          case 'square':
            let v31=(new Vec2()).add(points[points.length - 1], v0)
            let va=new Vec2().add(v1, v2).normalize().scale(len);
            let v3=new Vec2().add(points[i],va );
            let v4=(new Vec2()).sub(points[i], va);
            let v41=(new Vec2()).sub(points[points.length - 1], v0);
            outerSide.push(new Vec2().add(new Vec2().sub(v31,v3).normalize().scale(halfThick),v31));
            innerSide.push(new Vec2().add(new Vec2().sub(v41,v4).normalize().scale(halfThick),v41));
            break;  
          default:
            break;
        }
      }
    }

    const count = innerSide.length * 4 - 4;
    const position = new Float32Array(count * 2);
    const index = new Uint16Array(6 * count / 4); 

    // 创建 geometry 对象
    for(let i = 0; i < innerSide.length - 1; i++) {
      const a = innerSide[i],
        b = outerSide[i],
        c = innerSide[i + 1],
        d = outerSide[i + 1];

      const offset = i * 4;
      index.set([offset, offset + 1, offset + 2, offset + 2, offset + 1, offset + 3], i * 6);
      position.set([...a, ...b, ...c, ...d], i * 8);
    }
    return {position,index};
    // return new Geometry(gl, {
    //   position: {size: 2, data: position},
    //   index: {data: index},
    // });
  }