function cos(rad:number){
    return Math.cos(rad)
}
function sin(rad:number){
    return Math.sin(rad)
}
export class newVector{
    x: number;
    y: number;
    constructor(x=1,y=0){
        this.x=x;
        this.y=y;
    }
   
    // 复制向量
    copy(){
        return new newVector(this.x,this.y);
    }
    // 向量长度
    length(){
        return Math.hypot(this.x,this.y)
    }
    // 向量角度
    dir(){
        return Math.atan2(this.y,this.x)
    }
    // 向量点乘
    dot(v:any){
        return this.x*v.x+this.y*v.y;
    }
    // 向量叉乘
    cross(v:any){
        return this.x*v.y-v.x*this.y;
    }
    // 向量相加
    add(v:any){
       this.x+=v.x;
       this.y+=v.y;
       return this;
    }
    // 向量相减
    sub(v:any){
       this.x-=v.x;
       this.y-=v.y;
       return this;
    }
    // 向量与实数相乘
    multiply(l:number){
        this.x*=l;
        this.y*=l;
        return this;
    }
    // 向量旋转
    rotate(rad:number){
        let x=this.x;
        let y=this.y;
        this.x=x*cos(rad)-y*sin(rad);
        this.y=x*sin(rad)+y*cos(rad);
        return this;
    }
    // 向量间的夹角
    angle(v:any){
        let rad=Math.atan2(v.y,v.x)-Math.atan2(this.y,this.x)
        if(rad>Math.PI){
            rad-=2*Math.PI;
        }
        if(rad<-Math.PI){
            rad+=2*Math.PI;
        }
        return rad;
    }
    // 归一化
    normal(){
        let p=this;   
        return p.multiply(1/p.length());
    }
    // 判断p是否在线段AB上
    isLineSegment(pointA:any,pointB:any){
        let p=this;
        let a=new newVector(pointA.x,pointA.y)
        let b=new newVector(pointB.x,pointB.y)
        return (p.copy().sub(a).length()+p.copy().sub(b).length())==a.sub(b).length()?true:false
    }
    // 判断p是否在直线AB上
    isLine(pointA:any,pointB:any){
        let p=this;
        let a=new newVector(pointA.x,pointA.y)
        let b=new newVector(pointB.x,pointB.y)
        return p.copy().sub(a).cross(p.copy().sub(b))==0?true:false
    }
}