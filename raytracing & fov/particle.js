class Particle {
    constructor() {
        this.field_of_view = 45;
        this.heading = 0;

        this.raySize = 0.1; // the lower this is, the more rays of light and finer the picture

        this.position = createVector(width/2, height/2);
        this.rays = [];
        for (let a=-0.5*this.field_of_view; a<this.field_of_view/2; a+=this.raySize) {
            this.rays.push(new Ray(this.position, radians(a)))
        }
        // for (let a=0; a<360; a+=1) {
        //     this.rays.push(new Ray(this.position, radians(a)))
        // }
  }

  update_field_of_view(field_of_view) {
      this.field_of_view = field_of_view;
      this.rays = [];
      for (let a=-0.5*this.field_of_view; a<this.field_of_view/2; a+=this.raySize) {
          this.rays.push(new Ray(this.position, radians(a)+this.heading));
      }
  }

  rotate_particle(angle) {
      this.heading += angle;
      let index = 0;
      for (let a=-0.5*this.field_of_view; a<this.field_of_view/2; a+=this.raySize) {
          this.rays[index].setAngle(radians(a)+this.heading);
          index++;
      }
  }

  move_particle(amount) {
      const vel = p5.Vector.fromAngle(this.heading);
      vel.setMag(amount);
      this.position.add(vel);
  }

  update(x,y) {
      this.position.set(x,y);
  }

  look(walls) {
    // for (let ray of this.rays) {
    const scene = [];
    for (let i=0; i<this.rays.length; i++) {

        const ray = this.rays[i];
        let closest = null;
        let record = Infinity;

        for (let wall of walls){
            const pt = ray.cast(wall);

            if (pt) {
                let distance2wall = p5.Vector.dist(this.position,pt);
                const angle2wall = ray.direction.heading() - this.heading

                if (!mouseIsPressed) {
                    distance2wall *= cos(angle2wall);
                }

                if (distance2wall<record) {
                    record = distance2wall;
                    closest = pt;
                }
            }
        }

        if (closest) {
            // stroke(255,100);
            colorMode(HSB);
            stroke(255-(this.position.x)/3.3, 255-(this.position.y)/3.3, 255, 50);
            line(this.position.x, this.position.y, closest.x, closest.y)
        }
        scene[i] = record
    }
    return scene
  }

  show() {
        fill(255);
        ellipse(this.position.x,this.position.y,4);
        // for (let i=0;i<this.rays.length,i++) {
        for (let ray of this.rays) {
            ray.show()
        }
  }


}