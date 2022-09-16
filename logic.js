// 9-15-22

let my_width = window.innerWidth * .99;
let my_height = window.innerHeight * .97

let center_x = my_width * .5;
let center_y = my_height * .5;

function setup() {
    createCanvas(my_width, my_height);
    background(0);
}

function CreateRays() {
    for (let i = 0; i < 360; i++) {
        let other_end = AdjustVectorEnd([center_x, center_y], i, 60)
        listOfRays.push({
            start: [center_x, center_y],
            end: [other_end[0], other_end[1]],
            direction: i
        });
    }
}


function MoveRays(speed) {  // Adjust line ends to simulate movement
    listOfRays.forEach(ray => {
        ray.start = AdjustVectorEnd(ray.start, ray.direction, speed);
        ray.end = AdjustVectorEnd(ray.end, ray.direction, speed);
        line(ray.start[0], ray.start[1], ray.end[0], ray.end[1]);
    });
}


listOfRays = [];
CreateRays();


function draw() {
    clear();
    background(0);

    stroke(0, 255, 0);
    strokeWeight(5);
    fill(0, 75, 185)
    ellipse(center_x, center_y, 70, 70);



    stroke(255, 5, 0);
    strokeWeight(.5)
    
    
    MoveRays(1);
}

