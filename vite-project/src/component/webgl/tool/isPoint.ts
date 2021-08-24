import { newVector } from "../../tool/newVector";

export function isPointInPath(vertices:any, point:any) {
  let ret = false;
  for(let i = 0; i < vertices.length; i += 3) {
    const p1 = new newVector(...vertices[i]);
    const p2 = new newVector(...vertices[i+1]);
    const p3 = new newVector(...vertices[i+2]);
    if(inTriangle(p1, p2, p3, point)) {
      ret = true;
      break;
    }
  }
  return ret;
}
  
export function inTriangle(p1:newVector, p2:newVector, p3:newVector, point:newVector) {
    
    const a = p2.copy().sub(p1);
    const b = p3.copy().sub(p2);
    const c = p1.copy().sub(p3);
  
    const u1 = point.copy().sub(p1);
    const u2 = point.copy().sub(p2);
    const u3 = point.copy().sub(p3);
  
    const s1 = Math.sign(a.cross(u1));
    let p = a.dot(u1) / a.length() ** 2;
    if(s1 === 0 && p >= 0 && p <= 1) return true;
  
    const s2 = Math.sign(b.cross(u2));
    p = b.dot(u2) / b.length() ** 2;
    if(s2 === 0 && p >= 0 && p <= 1) return true;
  
    const s3 = Math.sign(c.cross(u3));
    p = c.dot(u3) / c.length() ** 2;
    if(s3 === 0 && p >= 0 && p <= 1) return true;
  
    return s1 === s2 && s2 === s3;
  }