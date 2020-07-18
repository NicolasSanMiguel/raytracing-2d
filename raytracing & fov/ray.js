class Ray {
    constructor(pos,angle) {
        // this.position = createVector(x,y);
        // this.direction = createVector(1,0);
        this.position = pos;
        this.direction = p5.Vector.fromAngle(angle); // in radians
    }

    setAngle(angle) {
        this.direction = p5.Vector.fromAngle(angle)
    }


    lookAt(x,y) {
        this.direction.x = x-this.position.x;
        this.direction.y = y-this.position.y;
        this.direction.normalize
    }

    show() {
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        line(0, 0, this.direction.x * 10, this.direction.y * 10);
        pop();
    }



    cast(wall) {
        // if t is between 0 and 1 and u >0, then it does intersect
        // line-line intersection wikipedia

        const x1 = wall.a.x; // 
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        const x3 = this.position.x; //this is the ray
        const y3 = this.position.y;
        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        // t = (x1-x3)(y3-y4)-(y1-y3)(x3-x4) / (x1-x2)(y3-y4)-(y1-y2)(x3-x4)
        // u = -1 * [(x1-x2)(y1-y3)-(y1-y2)(x1-x3) / (x1-x2)(y3-y4)-(y1-y2)(x3-x4)]
        const denom = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);

        // if the denom is 0, the ray is vertical as is the wall, return no intersection
        if (denom == 0) { 
            return;
        }

        const t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/denom;
        const u = -1*((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/denom;

        // The lines intersect at the following:
        // (Px,Py) = (x1 + t(x2-x1), y1+t(y2-y1))



        if (t > 0 && t < 1 && u>0){
            const pt = createVector();
            pt.x = x1+t*(x2-x1);
            pt.y = y1+t*(y2-y1);
            return pt;
        } else {
            return;
        }
    }
}