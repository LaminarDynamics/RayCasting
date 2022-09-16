// 9-15-22

let running = false;

let my_width = window.innerWidth * .99;
let my_height = window.innerHeight * .97

let center_x = my_width * .5;
let center_y = my_height * .5;

function setup() {
    createCanvas(my_width, my_height);
    background(0);
}

function CreateRays(start_location) {
    for (let i = 0; i < 360; i++) {
        let other_end = AdjustVectorEnd([start_location[0], start_location[1]], i, 60)
        listOfRays.push({
            start: [start_location[0], start_location[1]],
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
// CreateRays();

function mouseClicked() {
    let click_location = [mouseX, mouseY];
    CreateRays(click_location);
    // if (running) {
    //     running = false;
    // }
    // else {
    //     running = true;
    // }
}


function draw() {
    if (!running) {
        clear();
        background(0);

        // stroke(0, 255, 0);
        // strokeWeight(5);
        // fill(0, 75, 185)
        // ellipse(mouseX, mouseY, 20, 20);

        stroke(255, 5, 0);
        strokeWeight(.5)
        MoveRays(1);
    }

}

