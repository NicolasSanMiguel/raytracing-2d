let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10;

function setup() {
    createCanvas(800,800); // sets the size of the screen on the webpage

    // this for loop sets up five randomly placed walls when the page is loaded
    for (let i=0; i<5; i++) {
        let x_uno = random(width);
        let x_dos = random(width);
        let y_uno = random(height);
        let y_dos = random(height);
        walls[i] = new Boundary(x_uno,y_uno,x_dos,y_dos);
    }

    //add boundaries for all four walls if desired
    let addBorderWalls = false;
    if (addBorderWalls) {
        walls.push(new Boundary(0,0,width,0)); // top wall
        walls.push(new Boundary(0,height,0,0)); //left wall
        walls.push(new Boundary(width,0,width,height)); // right wall
        walls.push(new Boundary(width,height,0,height)); // bottom wall
    }

    // wall = new Boundary(100, 100, 300, 300); // use this line to make a single wall show up

    particle = new Particle(); // creates the particle light source
}

function draw() {
    background(0); // initializes a black background

    // shows each of the randomly created walls
    for (let wall of walls) {
        wall.show();
    }
    


    particle.show(); // creates a particle "light source"
    particle.look(walls) // checks each ray to see if which wall is closest
    // this lets the user change the desired motion source
    let desired_movement = "mouse";
    if (desired_movement == "random") {
        particle.update(noise(xoff) * width, noise(yoff) * height);
        xoff += 0.005;
        yoff += 0.005;  
    } else if (desired_movement == "mouse") {
        particle.update(mouseX,mouseY);
    } else {
        console.error('Warning: User must set desired movement as' +
            ' "mouse" or "random", the latter is the default.');
    }



    // let pt = ray.cast(wall);
    // console.log(pt);
    // if (pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8);
    // }
}
