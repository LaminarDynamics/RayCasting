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

        if (ray.start[0] < 0 || ray.start[0] > my_width || ray.start[1] < 0 || ray.start[1] > my_height) {  // Check if rays exiting canvas and remove them for performance
            listOfRays.splice(listOfRays.indexOf(ray), 1);
        }

        CheckIntersections(ray);
    });
}


listOfRays = [];
listOfWalls = [
    [my_width * .75, my_height * .25, my_width * .75, my_height * .75],
    [my_width * .75, my_height * .75, my_width * .25, my_height * .75]
];
// console.log(listOfWalls)
// CreateRays();

function mouseClicked() {
    let click_location = [mouseX, mouseY];
    CreateRays(click_location);
}

function DrawPermanents() {
    stroke(0, 255, 50);
    strokeWeight(1);
    listOfWalls.forEach(wall => {
        line(wall[0], wall[1], wall[2], wall[3]);
    });
}


function CheckIntersections(current_ray) {
    // let rayToCheck = CreateLine([current_ray[0], current_ray[1]], [current_ray[2], current_ray[3]]);
    // console.log(rayToCheck)

}


function draw() {

    clear();
    background(0);

    DrawPermanents();


    stroke(255, 5, 0);
    strokeWeight(.5);
    MoveRays(1);


    // console.log("Number of rays = ", listOfRays.length)
    // console.log(touches)
}





function showCoordinates(event) {   // For touchscreens
    var touch_x = Math.round(event.touches[0].clientX);
    var touch_y = Math.round(event.touches[0].clientY);

    let touch_location = [touch_x, touch_y];
    CreateRays(touch_location);
}